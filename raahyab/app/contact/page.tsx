import { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the RaahYab team — questions, feedback, or suggestions.",
};

export default function ContactPage() {

return (
  <ContactContent/>
 )
}