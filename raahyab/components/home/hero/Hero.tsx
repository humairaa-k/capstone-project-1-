"use client";

import HeroBackground from "@/components/home/hero/HeroBackground";
import HeroStats from "@/components/home/hero/HeroStats";
import HeroButtons from "@/components/home/hero/HeroBackground";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const { displayed } = useTypewriter();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      })
        .from(".hero-title", {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.2")
        .from(".hero-description", {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.2")
        .from(".hero-buttons", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.2")
        .from(".hero-stats", {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.1");
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden flex items-start xl:items-center xl:min-h-[calc(100vh-4rem)] bg-background"
    >
      <HeroBackground />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full 
  pt-20 pb-12 sm:pt-24 sm:pb-16 xl:pt-32 xl:pb-24">
        <div className="hero-badge inline-flex items-center gap-2 bg-teal-100 border border-primary/30 rounded-full px-4 py-1.5 mb-8 max-w-full">
          <span className="text-xs font-medium text-primary">
            Built for Afghan Youth
          </span>
        </div>

        <div className="hero-title mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Find Your Next
          </h1>

          <div className="min-h-[70px] sm:min-h-[72px] lg:min-h-[88px] flex items-baseline mt-2">
            <span
              style={{ fontFamily: "var(--font-dm-serif)" }}
              className="text-4xl sm:text-5xl lg:text-7xl italic text-primary leading-tight break-words"
            >
              {displayed}
              <span className="inline-block w-0.5 h-10 sm:h-12 lg:h-16 bg-accent ml-1 align-middle animate-pulse" />
            </span>
          </div>
        </div>

        <p className="hero-description text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed mb-8 sm:mb-10">
          Jobs, scholarships, internships, remote work and courses - everything
          Afghan youth need to build their future, right here.
        </p>

        <div className="hero-buttons mb-12 sm:mb-16">
          <HeroButtons />
        </div>

        <div className="hero-stats w-full border-t border-accent/20 pt-8 sm:pt-10">
          <HeroStats />
        </div>
      </div>
    </section>
  );
}
