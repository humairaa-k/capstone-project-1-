import Sidebar from "@/components/dashboard/Sidebar";


export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex gap-4 p-4 pt-24 min-h-screen bg-background">
      <aside className="hidden sm:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto h-fit w-60 shrink-0 rounded-3xl mb-8 bg-card border border-foreground/10 p-4">
       <Sidebar />
      </aside>

      <section className="flex-1 min-w-0">{children}</section>
    </div>

  )
}

