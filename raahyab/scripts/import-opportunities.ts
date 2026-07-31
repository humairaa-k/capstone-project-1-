import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import fs from "fs";
import path from "path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const filePath = path.join(process.cwd(), "data", "opportunities.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const opportunities = JSON.parse(raw);

  console.log(`Found ${opportunities.length} opportunities to import...`);

  let successCount = 0;
  let failCount = 0;

  for (const opp of opportunities) {
    try {
      await prisma.opportunity.create({
        data: {
          id: opp.id,
          title: opp.title,
          organization: opp.organization,
          category: opp.category,
          location: opp.location,
          type: opp.type,
          deadline: new Date(opp.deadline),
          description: opp.description,
          requirements: opp.requirements ?? [],
          tags: opp.tags ?? [],
          applyLink: opp.applyLink,
          createdAt: new Date(opp.createdAt),
          status: opp.status ?? "pending",
        },
      });
      successCount++;
    } catch (err) {
      failCount++;
      console.error(`Failed to import "${opp.title}" (id: ${opp.id}):`, err);
    }
  }

  console.log(`\nDone. ${successCount} imported, ${failCount} failed.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });