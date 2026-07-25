import { getOpportunities } from "@/lib/opportunities";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "opportunities.json");

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const { action } = await request.json();
    const opportunities = await getOpportunities();
    const index = opportunities.findIndex((opp: any) => opp.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
    }

    const existing: any = opportunities[index];

    // --- Delete requests: handled completely separately from edit requests ---
    if (existing.pendingAction === "delete") {
      if (action === "approve") {
        const updated = opportunities.filter((opp: any) => opp.id !== id);
        await fs.writeFile(dataFilePath, JSON.stringify(updated, null, 2));
        return NextResponse.json({ success: true, deleted: true });
      } else if (action === "reject") {
        opportunities[index] = {
          ...existing,
          status: "approved",
          pendingAction: undefined,
        };
        await fs.writeFile(dataFilePath, JSON.stringify(opportunities, null, 2));
        return NextResponse.json(opportunities[index]);
      } else {
        return NextResponse.json({ error: "Invalid action." }, { status: 400 });
      }
    }

    // --- Edit / new-submission requests ---
    if (action === "approve") {
      opportunities[index] = {
        ...existing,
        status: "approved",
        previousState: undefined,
      };
    } else if (action === "reject") {
      if (existing.previousState) {
        opportunities[index] = {
          ...existing.previousState,
          previousState: undefined,
        };
      } else {
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