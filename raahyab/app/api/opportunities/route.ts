import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { opportunitySchema } from "@/lib/schemas/opportunity";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const approvedOnly = await prisma.opportunity.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(approvedOnly);
  } catch {
    return NextResponse.json(
      { error: "Failed to load opportunities." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsed = opportunitySchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newOpportunity = await prisma.opportunity.create({
      data: {
        ...parsed.data,
        requirements: parsed.data.requirements.split(",").map((r) => r.trim()).filter(Boolean),
        tags: parsed.data.tags.split(",").map((t) => t.trim()).filter(Boolean),
        id: Date.now().toString(),
        status: "pending",
      },
    });

    return NextResponse.json(newOpportunity, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create opportunity." },
      { status: 500 }
    );
  }
}