"use client";

import Hero from "@/components/hero/Hero";
import CategorySection from "@/components/hero/categories/CategorySection";
import CTABanner from "@/components/hero/cta-banner/CTABanner";
import FeaturedSection from "@/components/hero/featured/FeaturedSection";
import HowItWorksSection from "@/components/hero/how-it-works/HowItWorksSection";
import RemoteSpotlightSection from "@/components/hero/remote-spotlight/RemoteSpotlight";

export default function Home() {
 return (
  <>
  <Hero/>
   <CategorySection/>
   <FeaturedSection/>
   <HowItWorksSection/>
   <RemoteSpotlightSection/>
   <CTABanner/>
  </>

 )
}
