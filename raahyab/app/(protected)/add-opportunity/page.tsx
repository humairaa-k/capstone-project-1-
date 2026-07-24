import { Metadata } from "next";
import AddOpportunityContent from "@/components/opportunity/add-opportunity/AddOpportunityContent";

export const metadata: Metadata = {
  title: "Add Opportunity",
  description:
    "Share a job, scholarship, internship, or course with the Afghan community and help someone discover their next opportunity.",
};


export default function AddOpportunityPage() {
  return (
   <AddOpportunityContent/> 
  )
}

