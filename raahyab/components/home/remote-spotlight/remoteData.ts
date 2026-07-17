import { opportunities} from "@/data/boybye";


export const remoteOpportunities = opportunities
      .filter((opp) => opp.type === "Remote")
      .slice(0, 3); 

