"use client"

import { Opportunity } from "@/types"; 
import OpportunityCard  from "@/components/opportunities/OpportunityCard"
import Heading from "@/components/common/Heading";
import FiltersSidebar from "@/components/opportunities/FiltersSidebar";
import SearchBar from "@/components/opportunities/SearchBar";
import { useEffect, useState, useMemo } from "react";
import { getDeadlineStatus } from "@/utils/getDeadlineStatus";
import EmptyState from "../common/EmptyState";
import { Search, FilePlus } from "lucide-react"

type PropsType = {
 initialOpportunities: Opportunity[];  
}


export default function OpportunityGrid({initialOpportunities} : PropsType) {
  const opportunities = initialOpportunities;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [location, setLocation] = useState("All");
  const [sortType, setSortType] = useState("newest");
  const [type, setType] = useState("All");
  const [expiringSoon, setExpiringSoon] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 


  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opport) => {
    const status = getDeadlineStatus(opport.deadline);

    return (
    (
    opport.title.toLowerCase().includes(search.toLowerCase()) ||
    opport.organization.toLowerCase().includes(search.toLowerCase()) ||
    opport.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))

    ) 
     && (category.length === 0 || category.includes(opport.category)) 
     && (location === "All" || opport.location === location) 
     && (type === "All" || opport.type === type)
     && ( !expiringSoon || status === "closingSoon" || status === "endingThisWeek")
    )
   });
  }, [opportunities, search, category, location, type, expiringSoon]);
  
 const sortedOpportunities = useMemo(() => {
   return [...filteredOpportunities].sort((a, b) => {

   if (sortType === "newest") {
     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
   }
   if (sortType === "deadline") {
     return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
   }
   return 0;

 });
 }, [filteredOpportunities, sortType]);
  
  //pagination
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage );
  const startIndex = (currentPage - 1 ) * itemsPerPage;

  const paginatedOpportunities = useMemo(() => { 
    return sortedOpportunities.slice( startIndex, startIndex + itemsPerPage);
  },[sortedOpportunities, startIndex, itemsPerPage] );

  useEffect(() => {
    setCurrentPage(1)
  }, [search, category, location, type, expiringSoon])

  const uniqueCat = useMemo(() => [...new Set(opportunities.map(opp => opp.category))],
  [opportunities]);

 const uniqueLocation = useMemo(() => [...new Set(opportunities.map(opp => opp.location))],
 [opportunities] );

  const uniqueType = useMemo(() => [...new Set(opportunities.map(opp => opp.type))],
  [opportunities] );

 
  const handleClearAll = () => {
   setCategory([]);
   setLocation("All");
   setType("All");
   setExpiringSoon(false)
   setSearch("")
  };



  return (
   <>
    <Heading
      title=" Explore"
      highlight=" Opportunities"
      subtitle = {`${filteredOpportunities.length} opportunities found ( Demo Data )`}
      className="animate-fade-in-up"
    />

    <div className=" p-5 sm:px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row gap-6">
          {/* filter sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 animate-fade-in-up-delay-1">
            <FiltersSidebar
            category={category}
            onCategoryChange={setCategory}
            location={location}
            onLocationChange={setLocation}
            type={type}
            onTypeChange={setType}
            expiringSoon={expiringSoon}
            onExpiringChange={setExpiringSoon}
            availableCat={uniqueCat}
            availableLocations={uniqueLocation}
            availableTypes={uniqueType}
            onClearAll={handleClearAll}
             />
          </aside>

          {/* Right column */}
          <div className="flex-1 min-w-0 space-y-6 animate-fade-in-up-delay-2">
            <SearchBar search={search} onSearch={setSearch} />

             <div className="flex justify-end">
             <div className="flex items-center gap-3">
               <label htmlFor="sort" className="text-sm text-muted-foreground hidden sm:block">
                 Sort by:
               </label>
               <select
                 id="sort"
                 value={sortType}
                 onChange={(e) => setSortType(e.target.value)}
                 className="border border-foreground/15 rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
               >
                 <option value="newest">Newest First</option>
                 <option value="deadline">Deadline Soonest</option>
               </select>
             </div>
           </div>
            
          { opportunities.length === 0 ? (
              <EmptyState
               title="No Opportunities Yet"
               description="Be the first to add an opportunity and help others in the community discover it."
               icon={FilePlus}
               buttonText="Add Opportunity"
               buttonHref="/add-opportunity"
              
              />
        
            ): filteredOpportunities.length === 0 ?(
              <EmptyState
               title="No Matching Results"
               description="Try adjusting your search or filter to find what you're looking for."
               icon={Search}
               buttonText="Clear Filters"
               onButtonClick={handleClearAll}
               />
            ) : (

             <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>

            )}

          </div>
      </div>

    <div className="flex items-center justify-center gap-2 my-16 ">
       <button
         onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
         disabled={currentPage === 1}
         className="px-3 py-2 rounded-lg border border-foreground/15 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/5"
       >
         Previous
       </button>
      
       {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
         <button
           key={page}
           onClick={() => setCurrentPage(page)}
           className={`px-3 py-2 rounded-lg border text-sm ${
             currentPage === page
               ? "bg-primary text-white border-primary"
               : "border-foreground/15 hover:bg-foreground/5"
           }`}
         >
           {page}
         </button>
       ))}
     
       <button
         onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
         disabled={currentPage === totalPages}
         className="px-3 py-2 rounded-lg border border-foreground/15 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground/5"
       >
         Next
    </button>
  </div>

    </div>
   </>
  )
}

