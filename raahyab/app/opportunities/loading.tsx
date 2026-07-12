export default function OpportunitiesLoading() {
  return (
    <div>
     {/* Heading skeleton */}
    <div className="max-w-3xl px-8 pt-30 sm:px-6 lg:px-10 py-10">
      <div className="shimmer h-9 w-72 rounded mb-3" />
      <div className="shimmer h-4 w-56 rounded" />
    </div>

      <div className="p-5 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar skeleton */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="rounded-2xl border border-foreground/8 p-6 space-y-6">
              <div className="shimmer h-5 w-20 rounded" />
              <div className="space-y-3">
                <div className="shimmer h-4 w-24 rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-2/3 rounded" />
              </div>
              <div className="space-y-3">
                <div className="shimmer h-4 w-20 rounded" />
                <div className="shimmer h-9 w-full rounded-lg" />
              </div>
              <div className="space-y-3">
                <div className="shimmer h-4 w-20 rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-full rounded" />
              </div>
            </div>
          </aside>

          {/* Right column */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Search bar skeleton */}
            <div className="shimmer h-24 sm:h-28 w-full rounded-3xl" />

            {/* Sort row skeleton */}
            <div className="flex justify-end">
              <div className="shimmer h-8 w-40 rounded-lg" />
            </div>

            {/* Cards grid skeleton */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-foreground/8 p-4 space-y-4"
                >
                  {/* badge + bookmark row */}
                  <div className="flex items-center justify-between">
                    <div className="shimmer h-5 w-16 rounded-full" />
                    <div className="shimmer h-9 w-9 rounded-full" />
                  </div>

                  {/* highlight panel */}
                  <div className="rounded-xl p-4 space-y-3 border border-foreground/6">
                    <div className="shimmer h-5 w-4/5 rounded" />
                    <div className="shimmer h-4 w-2/5 rounded" />
                    <div className="shimmer h-3 w-full rounded" />
                    <div className="shimmer h-3 w-3/4 rounded" />
                    <div className="flex gap-1.5 pt-1">
                      <div className="shimmer h-5 w-14 rounded-full" />
                      <div className="shimmer h-5 w-16 rounded-full" />
                    </div>
                  </div>

                  {/* metadata row */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="shimmer h-4 w-full rounded" />
                    <div className="shimmer h-4 w-full rounded" />
                    <div className="shimmer h-4 w-full rounded" />
                  </div>

                  <div className="h-px bg-foreground/8" />

                  {/* footer */}
                  <div className="flex items-center justify-between">
                    <div className="shimmer h-3 w-24 rounded" />
                    <div className="shimmer h-3 w-16 rounded" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}