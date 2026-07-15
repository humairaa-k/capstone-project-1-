"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase, GraduationCap, BookOpen, Users,
        Globe, Award,} from "lucide-react";


const targetUsers = [
  { label: "Students", icon: GraduationCap },
  { label: "Fresh Graduates", icon: Award },
  { label: "Job Seekers", icon: Briefcase },
  { label: "Women in Remote Work", icon: Globe },
  { label: "Scholarship Seekers", icon: BookOpen },
  { label: "Organizations", icon: Users },
];

const scatteredSources = [
  { label: "Facebook groups", rotate: -8 },
  { label: "WhatsApp chats", rotate: 6 },
  { label: "Random flyers", rotate: -4 },
  { label: "Telegram channels", rotate: 10 },
  { label: "Word of mouth", rotate: -12 },
];


gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutContent() {
   const containerRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const usersCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // from scattered to aligned 
      const chips = gsap.utils.toArray<HTMLElement>(".scatter-chip");
      chips.forEach((chip, i) => {
        gsap.set(chip, {
          rotate: scatteredSources[i].rotate,
          x: (i - 2) * 14,
          y: i % 2 === 0 ? -10 : 10,
        });
      });

      gsap.to(chips, {
        rotate: 0,
        x: 0,
        y: 0,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: chipsRef.current,
          start: "top 75%",
          end: "top 30%",
          scrub: 1,
        },
      });
     
    //  animation2
    gsap.set(usersCardRefs.current, { opacity: 0, y: 30, scale: 0.95 });
    ScrollTrigger.batch(usersCardRefs.current, {
      start: "top 85%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        }),
      once: true,
     });

      /*CTA fade+scale */
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <>
       {/* section 1 */}
    <div ref={containerRef}>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-fade-in-up-delay-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          The Problem
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground max-w-2xl leading-snug mb-16">
          Opportunities exist — but they&apos;re scattered across Facebook
          groups, WhatsApp chats, and other platforms.
        </h2>

        <div
          ref={chipsRef}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {scatteredSources.map((source) => (
            <span
              key={source.label}
              className="scatter-chip rounded-full border border-foreground/10 bg-card px-5 py-3 text-sm font-medium text-muted-foreground shadow-sm"
            >
              {source.label}
            </span>
          ))}
        </div>

        <p className="text-center text-sm text-primary mt-16 max-w-md mx-auto">
          RaahYab brings it all into one clean, searchable place.
        </p>
      </section>
    
    {/* section 2 */}
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 text-center">
        Who It&apos;s For
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-14">
        Built for every Afghan youth chasing a better opportunity.
      </h2>
    
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {targetUsers.map((user, i) => {
          const Icon = user.icon;
         return (
           <div
             key={user.label}
             ref={(el) => { usersCardRefs.current[i] = el; }}
             className="rounded-2xl border border-foreground/8 bg-card p-6 sm:p-8 hover:border-primary/30 transition-colors duration-200"
           >
             <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
               <Icon className="h-6 w-6 text-primary" />
             </div>
             <p className="text-lg font-semibold text-foreground">{user.label}</p>
           </div>
         );
       })}
    </div>
 </section>


    {/* section 3*/}
    <section ref={ctaRef}
     className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center overflow-hidden"
     >

     {/* bg icons */}
     <Briefcase className="absolute -left-4 top-6 h-32 w-32 sm:h-40 sm:w-40 text-primary/5 -rotate-12 pointer-events-none" />
     <GraduationCap className="absolute -right-4 bottom-6 h-32 w-32 sm:h-40 sm:w-40 text-primary/5 rotate-12 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Ready to find your next opportunity?
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          Browse jobs, internships, and scholarships built for Everyone.
        </p>
        
         <a href="/opportunities"
          className="inline-flex items-center justify-center rounded-2xl bg-primary hover:bg-primary-hover text-white font-medium px-8 py-4 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
        >
          Explore Opportunities
        </a>
      </div>
   </section>
    </div>
   </>
  )
}

