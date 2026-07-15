import { Metadata } from "next"
import SavedContent from "@/components/saved/SavedContent"

export const metadata: Metadata = {
  title: "Saved Opportunities",
  description: "View and manage the jobs, internships, and scholarships you've saved on RaahYab.",
};

export default function SavedPage() {

  return(
   <SavedContent/>
 )
}