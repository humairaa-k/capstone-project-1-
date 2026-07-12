export default function OpportunityDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-12">

        <div className="shimmer h-4 w-40 rounded mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Hero card skeleton */}
            <div className="rounded-2xl border border-foreground/8 p-7 space-y-5">
              <div className="flex gap-3">
                <div className="shimmer h-6 w-20 rounded-full" />
                <div className="shimmer h-6 w-28 rounded-full" />
              </div>
              <div className="shimmer h-9 w-3/4 rounded" />
              <div className="shimmer h-5 w-40 rounded" />
              <div className="flex gap-4">
                <div className="shimmer h-4 w-24 rounded" />
                <div className="shimmer h-4 w-24 rounded" />
                <div className="shimmer h-4 w-32 rounded" />
              </div>
            </div>

            {/* Details card skeleton */}
            <div className="rounded-2xl border border-foreground/8 overflow-hidden">
              <div className="p-6 sm:p-8 space-y-3">
                <div className="shimmer h-3 w-32 rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-2/3 rounded" />
              </div>
              <div className="h-px bg-foreground/8 mx-6 sm:mx-8" />
              <div className="p-6 sm:p-8 space-y-3">
                <div className="shimmer h-3 w-32 rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-5/6 rounded" />
                <div className="shimmer h-4 w-3/4 rounded" />
              </div>
              <div className="h-px bg-foreground/8 mx-6 sm:mx-8" />
              <div className="p-6 sm:p-8">
                <div className="shimmer h-3 w-32 rounded mb-4" />
                <div className="flex flex-wrap gap-2">
                  <div className="shimmer h-7 w-16 rounded-full" />
                  <div className="shimmer h-7 w-20 rounded-full" />
                  <div className="shimmer h-7 w-14 rounded-full" />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN skeleton */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-foreground/8 p-6 space-y-3">
              <div className="shimmer h-3 w-32 rounded" />
              <div className="shimmer h-6 w-40 rounded" />
              <div className="shimmer h-4 w-28 rounded" />
              <div className="shimmer h-1.5 w-full rounded-full" />
            </div>

            <div className="shimmer h-14 w-full rounded-2xl" />
            <div className="shimmer h-14 w-full rounded-2xl" />

            <div className="rounded-2xl border border-foreground/8 p-4 space-y-3">
              <div className="shimmer h-3 w-16 rounded" />
              <div className="flex gap-3">
                <div className="shimmer h-9 flex-1 rounded-xl" />
                <div className="shimmer h-9 flex-1 rounded-xl" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}