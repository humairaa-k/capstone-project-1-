
export function getDaysLeft(deadline: string) {
  const today = new Date();
  const end = new Date(deadline);
  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}


export function getDeadlineStatus(deadline: string ) {

 const daysLeft = getDaysLeft(deadline);

 if(daysLeft < 0) return "closed";
 if(daysLeft <= 3) return "closingSoon";
 if(daysLeft <= 7) return "endingThisWeek";

 return "normal";
 
}

