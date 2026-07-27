"use client";

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const tFooter = useTranslations("footer");
   const tNav = useTranslations("nav");

  return (
    <footer className="bg-zinc-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">

           <div className="col-span-2 sm:col-span-1 sm:pr-6">
            <Link href="/"
             className="flex items-center shrink-0">
            <Image
            src="/l-dark.png"
            alt="RaahYaab Logo"
            width={220}
            height={80}
            className="h-12 w-auto"
            priority
            />
         </Link> 
             <p className="text-sm text-white/60 leading-6 mt-3 max-w-xs">
               {tFooter("tagline")}
             </p>
           </div>

           <div className="pl-3">
             <h4 className="text-sm font-semibold text-white mb-4"> {tFooter("platform")} </h4>
             <ul className="space-y-2.5 ">
               <li>
                 <Link href="/" className="text-sm text-white/60 hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                  {tNav("home")}
                 </Link>
               </li>

                <li>
                 <Link href="/opportunities" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                     {tNav("opportunities")}
                 </Link>
               </li>
               
                <li>
                 <Link href="/saved" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                    {tNav("saved")}
                 </Link>
               </li>

                 <li>
                 <Link href="/dashboard" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                    {tNav("dashboard")}
                 </Link>
               </li>

             </ul>

           </div>

            <div>
             <h4 className="text-sm font-semibold text-white mb-4"> {tFooter("company")} </h4>
             <ul className="space-y-2.5">
               <li>
                 <Link href="/about" className="text-sm text-white/60 hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   {tNav("about")}
                 </Link>
               </li>

                <li>
                 <Link href="/contact" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   {tNav("contact")}
                 </Link>
               </li>
               
                <li>
                 <Link href="/add-opportunity" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   {tNav("addOpportunity")}
                 </Link>
               </li>
             </ul>

           </div>

           <div>
            <h4 className="text-sm font-semibold text-white mb-4">{tFooter("categories")}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/opportunities" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                  {tFooter("jobs")}
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   {tFooter("internships")}
                </Link>
              </li>
              <li>
             <Link href="/opportunities"  className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
               {tFooter("scholarships")}
             </Link>
           </li>
           <li>
             <Link href="/opportunities"  className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
               {tFooter("remoteWork")}
             </Link>
           </li>
         </ul>
           </div>
        </div>

      </div>

    </footer>
  )
}

