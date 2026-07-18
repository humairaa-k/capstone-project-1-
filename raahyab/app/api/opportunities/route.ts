import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getOpportunities } from "@/lib/opportunities";

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
  const body = await request.json();
  const opportunities = await getOpportunities();

  const newOpportunity = {
    ...body,
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