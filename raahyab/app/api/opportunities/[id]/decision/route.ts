import { getOpportunities } from "@/lib/opportunities";
import  { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "opportunities.json")

export async function POST (request: Request, {params}: {params: Promise<{ id: string }>} ) {
const {id} = await params;
try {
  const { action } = await request.json();
  const opportunities = await getOpportunities();
  const index = opportunities.findIndex((opp: any) => opp.id === id);
  if(index === -1) {
    return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
  }

  const existing:any = opportunities[index]

   if (action === "approve") {
      opportunities[index] = {
        ...existing,
        status: "approved",
        previousState: undefined, // this version is now official
      };
    } else if (action === "reject") {
      if (existing.previousState) {
        // restore pre-edit version
        opportunities[index] = {
          ...existing.previousState,
          previousState: undefined,
        };
      } else {
        // new submission
        opportunities[index] = {
          ...existing,
          status: "rejected",
        };
      }
    } else {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(opportunities, null, 2));
    return NextResponse.json(opportunities[index]);
  } catch {
    return NextResponse.json({ error: "Failed to process decision." }, { status: 500 });
  }
}