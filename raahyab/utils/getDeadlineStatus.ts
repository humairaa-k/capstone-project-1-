//import { opportunities } from "@/data/opportunities";

export function getDeadlineStatus(deadline: string ) {
 const today = new Date();
 const end = new Date(deadline);

 const diffTime = end.getTime() - today.getTime() ;
 const daysLeft = Math.ceil( diffTime / (1000 * 60 * 60 * 24));

 if(daysLeft < 0) return "closed";
 if(daysLeft <= 3) return "closingSoon";
 if(daysLeft <= 7) return "endingThisWeek";

 return "normal";
 
}