import Link from "next/link";
import CategoryGrid from "./CategoryGrid";

export default function CategorySection() {
  return (
    <section className="relative py-16 sm:py-20 bg-surface">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
              Browse by category
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              What are you
              <span className="text-primary"> looking for?</span>
            </h2>
          </div>

          <Link
            href="/opportunities"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-card px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:border-primary/40 hover:bg-primary hover:text-card"
          >
            View all -&gt;
          </Link>
        </div>

        <CategoryGrid />

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/opportunities"
            className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-card px-4 py-2 text-sm font-medium text-primary"
          >
            View all opportunities -&gt;
          </Link>
        </div>
      </div>
    </section>
  );
}
