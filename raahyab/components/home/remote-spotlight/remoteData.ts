import { opportunities} from "@/data/opportunities";


export const remoteOpportunities = opportunities
      .filter((opp) => opp.type === "Remote")
      .slice(0, 3); 

