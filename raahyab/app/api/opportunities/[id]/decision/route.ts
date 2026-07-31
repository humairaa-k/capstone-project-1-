import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { action } = await request.json();
    const existing = await prisma.opportunity.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
    }

    if (existing.pendingAction === "delete") {
      if (action === "approve") {
        await prisma.opportunity.delete({ where: { id } });
        return NextResponse.json({ success: true, deleted: true });
      } else if (action === "reject") {
        const reverted = await prisma.opportunity.update({
          where: { id },
          data: { status: "approved", pendingAction: null },
        });
        return NextResponse.json(reverted);
      } else {
        return NextResponse.json({ error: "Invalid action." }, { status: 400 });
      }
    }

    if (action === "approve") {
      const approved = await prisma.opportunity.update({
        where: { id },
        data: { status: "approved", previousState: Prisma.JsonNull, pendingAction: null },
      });
      return NextResponse.json(approved);
    } else if (action === "reject") {
      if (existing.previousState) {
        const prev = existing.previousState as any;
        const reverted = await prisma.opportunity.update({
          where: { id },
          data: {
            ...prev,
            previousState: Prisma.JsonNull,
            pendingAction: null,
          },
        });
        return NextResponse.json(reverted);
      } else {
        await prisma.opportunity.delete({ where: { id } });
        return NextResponse.json({ success: true, deleted: true });
      }
    } else {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Failed to process decision." }, { status: 500 });
  }
}