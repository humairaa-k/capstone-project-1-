import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getOpportunities } from "@/lib/opportunities";
import { opportunitySchema } from "@/lib/schemas/opportunity";
import { auth } from "@/lib/auth";


const dataFilePath = path.join(process.cwd(), "data", "opportunities.json");

export async function GET( request: Request, {params} : {params: Promise<{id: string}>} ) {
    const { id } = await params;
    try {
     const opportunities = await getOpportunities();
     const opportunity = opportunities.find((oppt: any) => oppt.id === id);

     if(!opportunity) {
      return NextResponse.json(
        { error: "Opportunity not found." },
        { status: 404}
      )
     }

     return NextResponse.json(opportunity);

    } catch {
      return NextResponse.json(
        {error: "Failed to find opportunity."},
        {status: 500}
    )
  }
}


export async function PUT( request: Request, {params} : {params: Promise<{ id: string }>} ) {
    const { id } = await params;
 
    try {
     const rawBody = await request.json()
     const parsed = opportunitySchema.safeParse(rawBody);
     if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() }, 
        { status: 400 });
     }

     const opportunities = await getOpportunities();
     const index = opportunities.findIndex((oppt: any) => oppt.id === id);
     if (index === -1) {
       return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
     }

     const existing: any = opportunities[index];
     const wasApproved = existing.status === "approved";

     const updated = {
      ...existing,
      ...parsed.data,
      requirements: parsed.data.requirements.split(",").map((r:string) => r.trim()).filter(Boolean),
      tags: parsed.data.tags.split(",").map((t:string) => t.trim()).filter(Boolean),
      id: existing.id,               //these three now can't be changed
      createdAt: existing.createdAt,
      status: existing.status === "approved" ? "pending" : existing.status,
      updatedAt: wasApproved ? new Date().toISOString() : existing.updatedAt,
      previousState: wasApproved ? existing : existing.previousState, // snapshot the old approved data 
      pendingAction: "edit",
    };

    opportunities[index] = updated;
    await fs.writeFile(dataFilePath, JSON.stringify(opportunities, null, 2));

    return NextResponse.json(updated);
  
    } catch {
     return NextResponse.json(
        {error: "Failed to update opportunity."},
        {status: 500}
     )
    }
} 


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const opportunities = await getOpportunities();
    const index = opportunities.findIndex((oppt: any) => oppt.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
    }

    // Admin deletes immediately
    if (session.user.role === "admin") {
      const updated = opportunities.filter((oppt: any) => oppt.id !== id);
      await fs.writeFile(dataFilePath, JSON.stringify(updated, null, 2));
      return NextResponse.json({ success: true });
    }

    // Regular user just flag it
    opportunities[index] = {
      ...opportunities[index],
      status: "pending",
      pendingAction: "delete",
    };

    await fs.writeFile(dataFilePath, JSON.stringify(opportunities, null, 2));
    return NextResponse.json({ success: true, pending: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process delete request." },
      { status: 500 }
    );
  }
}
