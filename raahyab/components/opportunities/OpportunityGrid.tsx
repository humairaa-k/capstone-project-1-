"use client"

import { Opportunity } from "@/types"; 
import OpportunityCard  from "@/components/opportunities/OpportunityCard"
import Heading from "@/components/common/Heading";
import FiltersSidebar from "@/components/opportunities/FiltersSidebar";
import SearchBar from "@/components/opportunities/SearchBar";
import { useEffect, useState, useMemo } from "react";
import { getDeadlineStatus } from "@/utils/getDeadlineStatus";
import EmptyState from "../common/EmptyState";
import { Search, FilePlus, SlidersHorizontal, X, Tags} from "lucide-react"
import { useTranslations } from "next-intl"

type PropsType = {
 initialOpportunities: Opportunity[];  
}


export default function OpportunityGrid({initialOpportunities} : PropsType) {
  const opportunities = initialOpportunities;
  const t = useTranslations("opportunitiesPage");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [location, setLocation] = useState("All");
  const [sortType, setSortType] = useState("newest");
  const [type, setType] = useState("All");
  const [expiringSoon, setExpiringSoon] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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

  const activeFiltersCount = 
  category.length + 
  (location !== "All" ? 1 : 0) +
  (type !== "All" ? 1 :0 ) +
  (expiringSoon ? 1 : 0);

 
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
     title={t("title")}
     highlight={t("highlight")}
     subtitle={t("subtitle", { count: filteredOpportunities.length })}
     className="animate-fade-in-up"
   />

    <div className=" p-5 sm:px-6 lg:px-10">

        <div className="flex flex-col lg:flex-row gap-6">
          {/* filter sidebar - desktop*/}
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

             <div className="flex items-center justify-end gap-3">
              {/* mobile filter btn */}
               <button
                onClick={()=> setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 border border-foreground/15 rounded-lg px-3 py-2 text-sm bg-background hover:bg-foreground/5"
                >
                <SlidersHorizontal size={16} />
                {t("filters.title")}
                {activeFiltersCount > 0 && (   
                 <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                 </span>
                )}
               </button>
               
               <label htmlFor="sort" className="text-sm text-muted-foreground hidden sm:block">
                  {t("OpportunitySort.sortBy")}
               </label>
               <select
                 id="sort"
                 value={sortType}
                 onChange={(e) => setSortType(e.target.value)}
                 className="border border-foreground/15 rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
               >
                <option value="newest">{t("OpportunitySort.newest")}</option>
                <option value="deadline">{t("OpportunitySort.deadline")}</option>
               </select>
             </div>
            
          { opportunities.length === 0 ? (
             <EmptyState
              title={t("empty.noneYetTitle")}
              description={t("empty.noneYetDescription")}
              icon={FilePlus}
              buttonText={t("empty.addOpportunity")}
              buttonHref="/add-opportunity"
             />
            ) : filteredOpportunities.length === 0 ? (
              <EmptyState
               title={t("empty.noMatchTitle")}
               description={t("empty.noMatchDescription")}
               icon={Search}
               buttonText={t("empty.clearFilters")}
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
         {t("pagination.previous")}
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
      {t("pagination.next")}
    </button>
     </div>
    </div>

   {/* mobile filter drawer */}
   {mobileFiltersOpen && ( 
      <div className="fixed inset-0 z-50 lg:hidden">
      <div 
      className="absolute inset-0 bg-black/50"
        onClick={()=> setMobileFiltersOpen(false)}
       />
     <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background p-4 overflow-y-auto shadow-xl">
      <div className="flex justify-end mb-4">
          <button
           onClick={() => setMobileFiltersOpen(false)}
           className="p-2 rounded-lg hover:bg-foreground/5"
           aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>
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
            variant="drawer"
          />

          <button
          onClick={() => setMobileFiltersOpen(false)}
          className="w-full mt-4 bg-primary text-white rounded-lg py-2.5 text-sm font-medium"
          >
           {t("filters.showResults", {count: filteredOpportunities.length}) }

          </button>
      </div>
    </div>
    )}
  
   </>
  )
}

