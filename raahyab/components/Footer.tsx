"use client";

import Link from "next/link"
import Image from "next/image"
import { useTranslations } from 'next-intl';

export default function Footer() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-zinc-900 border-t border-white/5">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-6">

          <div className="col-span-2 sm:col-span-1 sm:pr-6">
            <Link href="/" className="flex items-center shrink-0 mb-4">
              <Image
                src="/l-dark.png"
                alt="RaahYaab Logo"
                width={220}
                height={80}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-white/50 leading-7 max-w-xs">
              {tFooter("tagline")}
            </p>

            <div className="mt-5 inline-flex items-center gap-1.5 border border-gold-400/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-xs text-gold-400/80">Demo Data</span>
            </div>
          </div>

          <div className="pl-0 sm:pl-3">
            <h4 className="text-xs font-semibold text-white/80  uppercase tracking-widest mb-5">
              {tFooter("platform")}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: tNav("home") },
                { href: "/opportunities", label: tNav("opportunities") },
                { href: "/saved", label: tNav("saved") },
                { href: "/dashboard", label: tNav("dashboard") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary hover:translate-x-1 transition-all inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/80  uppercase tracking-widest mb-5">
              {tFooter("company")}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: tNav("about") },
                { href: "/contact", label: tNav("contact") },
                { href: "/add-opportunity", label: tNav("addOpportunity") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-primary hover:translate-x-1 transition-all inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/80 uppercase tracking-widest mb-5">
              {tFooter("categories")}
            </h4>
            <ul className="space-y-3">
              {[
                tFooter("jobs"),
                tFooter("internships"),
                tFooter("scholarships"),
                tFooter("remoteWork"),
              ].map((label) => (
                <li key={label}>
                  <Link
                    href="/opportunities"
                    className="text-sm text-white/50 hover:text-primary hover:translate-x-1 transition-all inline-block duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

     <div className="border-t border-white/5">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
         <p className="text-xs text-white/30">
           © {new Date().getFullYear()} RaahYaab. Built for Afghan Youth. Demo project.
         </p>
         <div className="flex items-center gap-1.5">
           <span className="text-xs text-white/20">Built with</span>
           <span className="text-xs text-primary font-medium">Next.js</span>
           <span className="text-xs text-white/20">·</span>
           <span className="text-xs text-gold-400 font-medium">Tailwind</span>
           <span className="text-xs text-white/20">·</span>
           <span className="text-xs text-blue-400 font-medium">TypeScript</span>
         </div>
       </div>
     </div>

    </footer>
  );
}