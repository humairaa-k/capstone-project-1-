import AboutContent from "@/components/about/AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about RaahYab's mission to connect youth with real opportunities.",
};

export default function AboutPage() {
  return (
    <>
    

       <AboutContent/>
    </>
  );
}