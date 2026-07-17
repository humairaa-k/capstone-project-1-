import fs from "fs/promises";
import path from "path";
import { Opportunity } from "@/types"; 


const dataFilePath = path.join( process.cwd(), "data", "opportunities.json");

export async function getOpportunities(): Promise<Opportunity[]> {  
    const fileContents = await fs.readFile(dataFilePath, "utf-8")
    return JSON.parse(fileContents)
} 
