'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import AuthNavButton from "./auth/AuthNavbar";
import { useSession } from "next-auth/react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from 'next-intl';


const links = [
  { href: "/", key: "home" },
  { href: "/opportunities", key: "opportunities" },
  { href: "/saved", key: "saved" },
  { href: "/dashboard", key: "dashboard" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

const protectedLinks = [
  { href: "/add-opportunity", key: "addOpportunity" },
  { href: "/cv-builder", key: "cvBuilder" },
  { href: "/dashboard/profile", key: "profile" },
] as const;

export default function Navbar() {
   const pathName = usePathname();
   const { isDark, toggleTheme } = useTheme();
   const {dir} = useLanguage();
   const t = useTranslations("nav");

   const [ isMobileOpen, setIsMobileOpen ] = useState(false);
   const { data: session } = useSession();
   const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
   const handleScroll = () => setIsScrolled(window.scrollY > 10);
   window.addEventListener("scroll", handleScroll)
   return () => window.removeEventListener("scroll", handleScroll)
  },[])

  const moblinks = session?.user? [...links, ...protectedLinks] : links;

  return (
   <header 
   dir={dir}
   className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-accent/20"
          : "bg-card border-b border-accent/10"
      }`}>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">
         <Link href="/" className="flex items-center shrink-0 py-2">
           <Image
             src={isDark ? "/l-dark.png" : "/l-light.png"}
             alt="RaahYab Logo"
             width={328}
             height={94}
             className="h-11 w-auto "
             priority
           />
           </Link>    

       {/* desktop links */}
          <div className="hidden lg:flex items-center gap-1">
           { links.map((link) => {
              const isActive = pathName === link.href;

              return (
                <Link 
                key={link.href} 
                href={link.href} 
                onClick={(e) => e.currentTarget.blur()}
                className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium ${isActive? "text-primary bg-teal-100" : "text-muted-foreground hover:text-foreground hover:bg-surface"
               }`}>
                   {t(link.key)}
                   {isActive && 
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full " />
                   }
                </Link>
              )
           })}
           </div>

         <div className="flex items-center gap-2">
            <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl border border-accent/20 bg-surface hover:bg-accent/10 flex items-center justify-center transition-all duration-200 group"
            aria-label="Toggle dark mode"
            >
            {isDark ? (
              <Sun className="w-4 h-4 text-accent group-hover:rotate-12 transition-transform duration-200"/> 
            ) : (
             <Moon className="w-4 h-4 text-muted-foreground group-hover:-rotate-12 transition-transform duration-200" /> 
            )}
            </button>
 
            <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden w-9 h-9 rounded-xl border border-accent/20 bg-surface hover:bg-accent/10 flex items-center justify-center transition-all duration-200"
            aria-label="Toggle mobile menu"
            >
            {isMobileOpen ? (
             <X className={"w-4 h-4 text-foreground"}/>
            ) : (
             <Menu className={"w-4 h-4 text-foreground"}/>
            )}
            </button>

             <LanguageSwitcher />
             <AuthNavButton />
             
         </div>
        </div>

         {isMobileOpen &&
           <div className="lg:hidden border-t border-accent/10 py-3 space-y-1 w-full">
              {moblinks.map((link) => {
              const isActive = pathName === link.href;
              return (
               <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 font-medium ${
                    isActive
                      ? "text-primary bg-teal-100"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  }`}
                  >
                  {t(link.key)}
                </Link>
              );
             })}
           </div>
          } 

          
     </nav>
   </header>
  )
}

