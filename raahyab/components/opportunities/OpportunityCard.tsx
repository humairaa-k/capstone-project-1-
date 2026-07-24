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

import { getDeadlineStatus } from "@/utils/getDeadlineStatus";
import { useSaved } from "@/context/SavedContext";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

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

  const { savedOpt, toggleSave } = useSaved();
  const isSaved = savedOpt.includes(opportunity.id);

   const {
     data: session,
     status: sessionStatus,
     } = useSession();

   const router = useRouter();
   const pathname = usePathname();

  const visibleTags = opportunity.tags.slice(0, 3);

  const theme =
    categoryThemes[
      opportunity.category as keyof typeof categoryThemes
    ] ?? categoryThemes.Job;

  const deadlineStatus = getDeadlineStatus(opportunity.deadline)

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (sessionStatus === "loading") return;
  if (!session?.user) {
    toast.info("Please log in to save opportunities.");
    router.push(
      `/login?callbackUrl=${encodeURIComponent(pathname)}`
    );
    return;
  }
  toggleSave(opportunity.id);
};

  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className="group block focus:outline-none"
    >
    <article
     className="
       relative
       flex
       flex-col
       rounded-2xl
       border
       border-foreground/8
       bg-card
       p-4
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

        <div className="mb-3 flex items-center justify-between">
          <span
            className={`
              inline-flex
              items-center
              rounded-full
              border
              px-2.5
              py-0.5
              text-[11px]
              font-semibold
              tracking-wide
              ${theme.badge}
            `}
          >
            {opportunity.category}
          </span>

          <button
            aria-label="Save opportunity"
            onClick={handleSaveClick}
            className="
              flex
              h-9
              w-9
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
            <Bookmark 
            className={`h-5 w-5 transition-all duration-200 
              ${isSaved ? `fill-current opacity-70 ${theme.accent}`: theme.accent}`}
            />
          </button>
        </div>

       {/* highlight panel */}
        <div
          className={`
            relative
            overflow-hidden
            rounded-xl
            p-4
            ${theme.wrapper}
          `}
        >
          {/* blob on the corner */}

          <div
            className={`
              absolute
              -right-8
              -top-8
              h-24
              w-24
              rounded-full
              blur-2xl
              ${theme.blob}
            `}
          />

          <div className="relative z-10">
            <div className="flex justify-between items-start gap-4">
            <h3
              className="
                text-lg
                font-bold
                line-clamp-2
                leading-tight
                text-foreground
                transition-colors
                duration-300
                group-hover:text-primary
                dark:group-hover:text-foreground
                flex-1 
              "
            >
              {opportunity.title}
            </h3>

                      
          {deadlineStatus  === "closingSoon" && (
             <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700">
              Closing Soon
            </span>
          )}

          {deadlineStatus  === "endingThisWeek" && (
          <span className="shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-700">
            Ends This Week
          </span>
           )}

           {deadlineStatus === "closed" && (
            <span className="shrink-0 rounded-full bg-gray-200 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
              Closed
            </span>
          )}

          </div>

            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              {opportunity.organization}
            </div>

            <p className="mt-2.5 line-clamp-2 text-xs leading-6 text-muted-foreground">
              {opportunity.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    bg-white/70
                    px-2.5
                    py-0.5
                    text-[11px]
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
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <span className="flex items-center min-w-0 gap-2">
            <MapPin className={`h-3.5 w-3.5 shrink-0 ${theme.accent}`} />
            <span className="truncate">
              {opportunity.location}
            </span>
          </span>

          <span className="flex items-center min-w-0 gap-2">
            <BriefcaseBusiness className={`h-3.5 w-3.5 shrink-0 ${theme.accent}`} />
            <span className="truncate">
              {opportunity.type}
            </span>
          </span>

          <span className="flex items-center min-w-0 gap-2">
            <CalendarClock className={`h-3.5 w-3.5 shrink-0 ${theme.accent}`} />
            <span className="truncate">
              {formatDeadline(opportunity.deadline)}
            </span>
          </span>
        </div>

        <div className="flex-1" />
        <div className="my-3 h-px bg-border/70" />

        {/* Footer */}

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Explore this opportunity
          </span>

          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-semibold
              transition-all
              duration-300
              ${theme.accent}
            `}
          >
            View Details

            <ArrowRight
              className="
                h-3.5
                w-3.5
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
            rounded-2xl
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          " >
          <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/10" />
        </div>
      </article>
    </Link>
  );
}
