import fs from "fs/promises";
import path from "path";
import { Opportunity} from "@/types"; 
import { OpportunityFormData } from "@/lib/schemas/opportunity";


const dataFilePath = path.join( process.cwd(), "data", "opportunities.json");

export async function getOpportunities(): Promise<Opportunity[]> {  
    const fileContents = await fs.readFile(dataFilePath, "utf-8")
    return JSON.parse(fileContents)
} 


export async function getOpportunityById (id: string) : Promise<Opportunity | null> {
const opportunities = await getOpportunities();
return opportunities.find((opp) => opp.id === id) ?? null;
}

export function toFormData(opp: Opportunity): Partial<OpportunityFormData> {
  return {
    title: opp.title,
    organization: opp.organization,
    category: opp.category as OpportunityFormData["category"],
    location: opp.location,
    type: opp.type as OpportunityFormData["type"],
    deadline: opp.deadline,
    description: opp.description,
    requirements: opp.requirements.join(", "),
    tags: opp.tags.join(", "),
    applyLink: opp.applyLink,
  };
}