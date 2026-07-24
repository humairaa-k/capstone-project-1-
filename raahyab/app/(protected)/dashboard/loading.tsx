export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-4">

        {/* HERO HEADER */}
        <div className="rounded-3xl bg-primary/20 p-6 sm:p-8 mb-6 space-y-3">

          <div className="shimmer h-3 w-56 rounded" />

          <div className="shimmer h-9 w-72 rounded" />

        </div>


        {/* BIG STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">

          <div className="rounded-2xl border border-foreground/8 p-6 space-y-4">
            <div className="shimmer h-10 w-10 rounded-xl" />
            <div className="shimmer h-3 w-36 rounded" />
            <div className="shimmer h-9 w-20 rounded" />
            <div className="shimmer h-3 w-28 rounded" />
          </div>


          <div className="rounded-2xl border border-foreground/8 p-6 space-y-4">
            <div className="shimmer h-10 w-10 rounded-xl" />
            <div className="shimmer h-3 w-36 rounded" />
            <div className="shimmer h-9 w-20 rounded" />
            <div className="shimmer h-3 w-28 rounded" />
          </div>

        </div>



        {/* SMALL STATS + CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 mb-4">


          {/* SMALL CARDS */}
          <div className="grid grid-cols-2 gap-4">

            {[1,2,3,4].map((item)=>(
              <div
                key={item}
                className="rounded-2xl border border-foreground/8 p-5 space-y-4"
              >
                <div className="shimmer h-9 w-9 rounded-xl" />
                <div className="shimmer h-3 w-20 rounded" />
                <div className="shimmer h-8 w-16 rounded" />
              </div>
            ))}

          </div>



          {/* TREND CHART */}
          <div className="rounded-2xl border border-foreground/8 p-6 space-y-5">

            <div className="flex justify-between">
              <div className="shimmer h-4 w-32 rounded" />
              <div className="shimmer h-4 w-20 rounded" />
            </div>


            <div className="flex items-end gap-3 h-52">

              {[40,70,55,90,60,80].map((height,index)=>(
                <div
                  key={index}
                  className="shimmer flex-1 rounded-t-lg"
                  style={{
                    height:`${height}%`
                  }}
                />
              ))}

            </div>

          </div>


        </div>



        {/* CATEGORY BAR CHART */}

        <div className="rounded-2xl border border-foreground/8 p-6 mb-6 space-y-5">

          <div className="shimmer h-4 w-40 rounded"/>

          <div className="shimmer h-56 w-full rounded-xl"/>

        </div>




        {/* RECENT SUBMISSIONS */}

        <div className="space-y-4">


          {/* Admin pending approval skeleton */}
          <div className="rounded-2xl border border-foreground/8 p-6 space-y-4">

            <div className="shimmer h-4 w-44 rounded"/>

            {[1,2,3].map(item=>(
              <div
                key={item}
                className="flex items-center justify-between gap-4"
              >

                <div className="shimmer h-10 flex-1 rounded-xl"/>

                <div className="shimmer h-8 w-20 rounded-full"/>

              </div>
            ))}

          </div>



          {/* Recent submissions */}

          <div className="rounded-2xl border border-foreground/8 p-6 space-y-4">

            <div className="shimmer h-4 w-40 rounded"/>


            {[1,2,3].map(item=>(
              <div
                key={item}
                className="flex gap-4 items-center"
              >

                <div className="shimmer h-12 w-12 rounded-xl"/>

                <div className="space-y-2 flex-1">
                  <div className="shimmer h-3 w-1/2 rounded"/>
                  <div className="shimmer h-3 w-1/3 rounded"/>
                </div>

              </div>
            ))}


          </div>


        </div>


      </div>

    </div>
  );
}