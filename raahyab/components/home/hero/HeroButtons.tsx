import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react";

export default function HeroButtons() {

  return (
       <>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <Link
            href="/signup"
            className="group flex items-center gap-2 bg-primary hover:bg-primary-hover text-white rounded-xl px-7 py-3 text-sm font-medium  text-center transition-colors duration-200"
          >
            Get Started
             <ArrowRight
               size={16}
               strokeWidth={2}
               className="transition-transform duration-200 group-hover:translate-x-0.5"
             />
          </Link>
          <Link
            href="/add-opportunity"
            className="group flex items-center gap-2 bg-transparent text-foreground border border-accent/40 hover:bg-surface rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 text-center">
             <Compass size={16} strokeWidth={2} className="text-primary" />
             Explore Opportunities
          </Link>
        </div>
     </>
  )
}

