import { getOpportunities } from "@/lib/opportunities";

import Hero from "@/components/home/hero/Hero";
import CategorySection from "@/components/home/categories/CategorySection";
import CTABanner from "@/components/home/cta-banner/CTABanner";
import FeaturedSection from "@/components/home/featured/FeaturedSection";
import HowItWorksSection from "@/components/home/how-it-works/HowItWorksSection";
import RemoteSpotlightSection from "@/components/home/remote-spotlight/RemoteSpotlight";
import CategoryGrid from "@/components/home/categories/CategoryGrid"

export default async function Home() {
  const opportunities = await getOpportunities();
 return (
  <>
   <Hero opportunities={opportunities} />
  <CategorySection >
   <CategoryGrid opportunities={opportunities} />
   </CategorySection>
   <FeaturedSection opportunities={opportunities}/>
   <HowItWorksSection/>
   <RemoteSpotlightSection opportunities={opportunities}/>
   <CTABanner/>
  </>

 )
}
