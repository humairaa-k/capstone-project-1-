"use client";

import { Opportunity } from "@/types";
import Link from "next/link";
import { categoryThemes } from "@/constants/opportunityThemes";
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  MapPin,
  ArrowRight,
} from "lucide-react";

 interface FeaturedCardProps {
  opportunity: Opportunity;
}

function formatDeadline(deadline: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(deadline));
}


export default function FeaturedCard({
  opportunity,
}: FeaturedCardProps) {
  const visibleTags = opportunity.tags.slice(0, 3);

  const theme =
    categoryThemes[
      opportunity.category as keyof typeof categoryThemes
    ] ?? categoryThemes.Job;

  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className="group block focus:outline-none"
    >
    <article
     className="
       relative
       flex
       min-h-[22rem]
       flex-col
       rounded-2xl
       border
       border-foreground/8
       bg-card
       p-5
       shadow-sm
       transition-all
       duration-300
       hover:-translate-y-1
       hover:shadow-lg
       hover:shadow-primary/8
      hover:border-foreground/15
      focus-visible:ring-2
      focus-visible:ring-primary
      "
    >

        <div className="mb-5 flex items-center justify-between">
          <span
            className={`
              inline-flex
              items-center
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-semibold
              tracking-wide
              ${theme.badge}
            `}
          >
            {opportunity.category}
          </span>

          <button
            aria-label="Save opportunity"
            onClick={(e) => e.preventDefault()}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
            border-foreground/12
              backdrop-blur
              transition-all
              duration-300
              hover:scale-105
              hover:bg-white
            "
          >
            <Bookmark className={`h-5 w-5 ${theme.accent}`} />
          </button>
        </div>

       {/* highlight panel */}
        <div
          className={`
            relative
            overflow-hidden
            rounded-2xl
            p-6
            ${theme.wrapper}
          `}
        >
          {/* blob on the corner */}

          <div
            className={`
              absolute
              -right-10
              -top-10
              h-36
              w-36
              rounded-full
              blur-3xl
              ${theme.blob}
            `}
          />

          <div className="relative z-10">
            <h3
              className="
                text-2xl
                font-bold
                leading-tight
                text-foreground
                transition-colors
                duration-300
                group-hover:text-primary
                dark:group-hover:text-foreground
              "
            >
              {opportunity.title}
            </h3>

            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Building2 className="h-4 w-4" />
              {opportunity.organization}
            </div>

            <p className="mt-5 line-clamp-2 text-sm leading-7 text-muted-foreground">
              {opportunity.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    bg-white/70
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-foreground
                    backdrop-blur
                    dark:bg-white/10
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* metadata */}
        <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <span className="flex items-center gap-2">
            <MapPin className={`h-4 w-4 ${theme.accent}`} />
            <span className="truncate">
              {opportunity.location}
            </span>
          </span>

          <span className="flex items-center gap-2">
            <BriefcaseBusiness className={`h-4 w-4 ${theme.accent}`} />
            <span className="truncate">
              {opportunity.type}
            </span>
          </span>

          <span className="flex items-center gap-2">
            <CalendarClock className={`h-4 w-4 ${theme.accent}`} />
            <span className="truncate">
              {formatDeadline(opportunity.deadline)}
            </span>
          </span>
        </div>

        <div className="flex-1" />
        <div className="my-5 h-px bg-border/70" />

        {/* Footer */}

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Explore this opportunity
          </span>

          <span
            className={`
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              transition-all
              duration-300
              ${theme.accent}
            `}
          >
            View Details

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </span>
        </div>

        {/* glow the Border */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-3xl
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          " >
          <div className="absolute inset-0 rounded-3xl ring-1 ring-primary/10" />
        </div>
      </article>
    </Link>
  );
}