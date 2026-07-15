import Link from "next/link"
import Image from "next/image"

export default function Footer() {
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
             <p className="text-sm text-white/60 leading-6 max-w-xs">
               Your one-stop platform for jobs, internships, and scholarships across Afghanistan.
             </p>
           </div>

           <div className="pl-3">
             <h4 className="text-sm font-semibold text-white mb-4"> Platform</h4>
             <ul className="space-y-2.5 ">
               <li>
                 <Link href="/" className="text-sm text-white/60 hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   Home
                 </Link>
               </li>

                <li>
                 <Link href="/opportunities" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                    Opportunities
                 </Link>
               </li>
               
                <li>
                 <Link href="/saved" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   Saved
                 </Link>
               </li>

                 <li>
                 <Link href="/dashboard" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   Dashboard
                 </Link>
               </li>

             </ul>

           </div>

            <div>
             <h4 className="text-sm font-semibold text-white mb-4"> Company</h4>
             <ul className="space-y-2.5">
               <li>
                 <Link href="/about" className="text-sm text-white/60 hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   About
                 </Link>
               </li>

                <li>
                 <Link href="/contact" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                    Contact
                 </Link>
               </li>
               
                <li>
                 <Link href="/add-opportunity" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                   Add Opportunity
                 </Link>
               </li>
             </ul>

           </div>

           <div>
            <h4 className="text-sm font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/opportunities" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
                  Internships
                </Link>
              </li>
              <li>
             <Link href="/opportunities"  className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
               Scholarships
             </Link>
           </li>
           <li>
             <Link href="/opportunities"  className="text-sm text-white/60  hover:text-primary hover:translate-x-1 transition-all inline-block duration-200">
               Remote Work
             </Link>
           </li>
         </ul>
           </div>
        </div>

      </div>

    </footer>
  )
}

