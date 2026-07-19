import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getOpportunities } from "@/lib/opportunities";
import { opportunitySchema } from "@/lib/schemas/opportunity";

const dataFilePath = path.join(process.cwd(), "data","opportunities.json");

export const dynamic = "force-dynamic";

export async function GET() {
try {
 const opportunities = await getOpportunities();
 const approvedOnly = opportunities.filter((opp: any) => opp.status === "approved")
 return NextResponse.json(approvedOnly);

} catch {
  return NextResponse.json(
    {error: "Failed to load opportunities."},
    {status: 500}
  )
 }
}

export async function POST(request: Request) {
 try {
  const rawBody = await request.json();
  const parsed = opportunitySchema.safeParse(rawBody);
  if(!parsed.success){
    return NextResponse.json(
      { error: parsed.error.flatten()},
      { status: 400}
    );
  }

  const opportunities = await getOpportunities();

  const newOpportunity = {
    ...parsed.data,
    requirements: parsed.data.requirements.split(",").map((r) => r.trim()).filter(Boolean),
    tags: parsed.data.tags.split(",").map((t) => t.trim()).filter(Boolean),
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split("T")[0],
    status: "pending",
  };

  const updated = [newOpportunity, ...opportunities]
  await fs.writeFile(dataFilePath, JSON.stringify(updated, null, 2));

 return NextResponse.json(newOpportunity, {status: 201})

 } catch {
  return NextResponse.json(
    {error: "Failed to create opportunity."},
    {status: 500})
 }

}