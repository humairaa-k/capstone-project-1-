"use client"
import Image from "next/image";
import Link from "next/link";

import { CategoryDataType } from "./CategoryData";

type CategoryCardProps = CategoryDataType & {
  count: number;
} 

export default function CategoryCard({ title, slug, iconSrc, count }: CategoryCardProps) {
  
 return (
    <Link
      href={`/opportunities?category=${slug}`}
      className="group relative bg-card border border-accent/20 rounded-2xl p-4 flex flex-col items-center gap-2.5 overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1"
    >
      {/* glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(15,118,110,0.08) 0%, transparent 70%)"
        }}
      />

      <div className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={iconSrc}
          alt={title}
          fill
          className="object-contain drop-shadow-md"
        />
      </div>

      <div className="text-center z-10">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {count} {count === 1 ? 'opportunity' : 'opportunities'}
        </p>
      </div>

      <div className="absolute bottom-3 right-3 bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
        <span className="text-xs text-primary dark:text-teal-100 font-medium">→</span>
      </div>
    </Link>
  );
}

