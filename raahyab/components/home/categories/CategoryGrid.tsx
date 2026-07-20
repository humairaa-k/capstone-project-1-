 import { categories } from './CategoryData'
 import CategoryCard from './CategoryCard'
 import { Opportunity } from "@/types";


 export default function CategoryGrid({ opportunities }: { opportunities: Opportunity[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {categories.map((cat) => {
       const dynamicCount = opportunities.filter((opp) => opp.category === cat.category).length;

       return(
          <CategoryCard 
          key={cat.id}
           {...cat}
           count={dynamicCount}
           />
       )
       
      })}
    </div>

  )
}