import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
 title: string;
 description: string;
 icon: LucideIcon;

 buttonText?: string;
 buttonHref?: string;
 onButtonClick?: () => void;

 showButton?: boolean;
}

export default function EmptyState({
  title,
  description,
  icon: Icon,
  buttonText = "Go Back",
  buttonHref = "/",
  onButtonClick,
  showButton = true,
}: EmptyStateProps) {
  return (
  <section className="flex items-center justify-center bg-background px-4 py-16">
    <div className="relative w-full max-w-xl rounded-2xl border border-foreground/8 bg-card px-8 py-14 text-center overflow-hidden shadow-sm">      
      {/* Decorative glow — much softer */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/4 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-accent/4 blur-3xl" />

      {/* Icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-foreground/8 text-primary">
        <Icon className="h-8 w-8" />
      </div>

      {/* Title */}
      <h2 className="mt-6 text-2xl font-semibold text-foreground">
        {title}
      </h2>

      {/* Description */}
      <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* CTA */}
      {showButton && (
        onButtonClick ? (
          <button
            onClick={onButtonClick}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20"
          >
            {buttonText}
          </button>
        ) : (
          <Link
            href={buttonHref}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20"
          >
            {buttonText}
          </Link>
        )
      )}
    </div>
  </section>
);
}