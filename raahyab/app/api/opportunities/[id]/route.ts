import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getOpportunities } from "@/lib/opportunities";
import { opportunitySchema } from "@/lib/schemas/opportunity";

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

     const updated = {
      ...existing,
      ...parsed.data,
      requirements: parsed.data.requirements.split(",").map((r:string) => r.trim()).filter(Boolean),
      tags: parsed.data.tags.split(",").map((t:string) => t.trim()).filter(Boolean),
      id: existing.id,               //these three now can't be changed
      createdAt: existing.createdAt,
      status: existing.status,
    };

    opportunities[index] = updated;
    await fs.writeFile(dataFilePath, JSON.stringify(opportunities, null, 2));

    return NextResponse.json(updated);
    
    //  await fs.writeFile(dataFilePath, JSON.stringify(updated, null , 2));
    //  const updatedOpportunity = updated.find((oppt: any) => oppt.id === id)
    //  return NextResponse.json(updatedOpportunity);
    } catch {
     return NextResponse.json(
        {error: "Failed to update opportunity."},
        {status: 500}
     )
    }
} 


export async function DELETE(request: Request, { params }: {params: Promise<{ id: string }>}) {
    const { id } = await params;
    try {
      const opportunities = await getOpportunities() 
      const updated = opportunities.filter((oppt: any) => oppt.id !== id)
      await fs.writeFile(dataFilePath, JSON.stringify( updated, null, 2))
      return NextResponse.json({success: true})
    } catch {
     return NextResponse.json(
      {error: "Failed to delete Opportunity."},
      {status: 500}
     )
   }
     
}
