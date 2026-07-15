import Heading from "@/components/common/Heading";
import AboutContent from "@/components/about/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about RaahYab's mission to connect youth with real opportunities.",
};

export default function AboutPage() {
  return (
    <>
     <Heading
         title="About "
         highlight="Us"
         subtitle={`One platform. Every opportunity.`}
          className="animate-fade-in-up"
       />

       <AboutContent/>
    </>
  );
}