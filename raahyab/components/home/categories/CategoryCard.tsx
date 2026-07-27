"use client"
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { CategoryDataType } from "./CategoryData";

interface CategoryCardProps {
  title: string;
  category: string;  
  slug: string;
  iconSrc: string;
  count: number;
}

export default function CategoryCard({ category, slug, iconSrc, count }: CategoryCardProps) {
  const t = useTranslations("addOpportunityPage.form");
  const tCount = useTranslations("categoryBrowse");
  const label = t(`categories.${category}`);

  return (
    <Link
      href={`/opportunities?category=${slug}`}
      className="group relative bg-card border border-accent/20 rounded-2xl p-4 flex flex-col items-center gap-2.5 overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(15,118,110,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110">
        <Image src={iconSrc} alt={label} fill className="object-contain drop-shadow-md" />
      </div>

      <div className="text-center z-10">
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {label}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {tCount("opportunityCount", { count })}
        </p>
      </div>

      <div className="absolute bottom-3 right-3 bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
        <span className="text-xs text-primary dark:text-teal-100 font-medium">→</span>
      </div>
    </Link>
  );
}

