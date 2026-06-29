import Link from "next/link"

export default function HeroButtons() {

  return (
       <>
         <div className="gsap-cta flex flex-col sm:flex-row gap-3 flex-wrap mb-14">
          <Link
            href="/opportunities"
            className="bg-primary hover:bg-primary-hover text-white rounded-xl px-7 py-3 text-sm font-medium transition-colors duration-200 text-center"
          >
            Browse Opportunities
          </Link>
          <Link
            href="/add-opportunity"
            className="bg-transparent text-foreground border border-accent/40 hover:bg-surface rounded-xl px-7 py-3 text-sm font-medium transition-colors duration-200 text-center"
          >
            Add an Opportunity
          </Link>
        </div>
     </>
  )
}

