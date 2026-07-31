import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";
import { opportunitySchema } from "@/lib/schemas/opportunity";
import { auth } from "@/lib/auth";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const opportunity = await prisma.opportunity.findUnique({ where: { id } });

    if (!opportunity) {
      return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
    }

    return NextResponse.json(opportunity);
  } catch {
    return NextResponse.json({ error: "Failed to find opportunity." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const rawBody = await request.json();
    const parsed = opportunitySchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const existing = await prisma.opportunity.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
    }

    const wasApproved = existing.status === "approved";

    const updated = await prisma.opportunity.update({
      where: { id },
      data: {
        ...parsed.data,
        requirements: parsed.data.requirements.split(",").map((r: string) => r.trim()).filter(Boolean),
        tags: parsed.data.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
        status: wasApproved ? "pending" : existing.status,
        updatedAt: wasApproved ? new Date() : existing.updatedAt,
        previousState: wasApproved
          ? (existing as any)
          : existing.previousState === null
          ? Prisma.JsonNull
          : existing.previousState,
        pendingAction: "edit",
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update opportunity." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await prisma.opportunity.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
    }

    // Admin deletes immediately
    if (session.user.role === "admin") {
      await prisma.opportunity.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    // Regular user just flags it
    await prisma.opportunity.update({
      where: { id },
      data: {
        status: "pending",
        pendingAction: "delete",
      },
    });

    return NextResponse.json({ success: true, pending: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process delete request." },
      { status: 500 }
    );
  }
}