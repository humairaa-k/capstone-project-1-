export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Background */}
      <div 
      className="absolute inset-0
       bg-background/55
       dark:bg-background/55
       backdrop-blur-md" />

      
       {/* top progress bar */}
      <div className="fixed top-0 left-0 h-1 w-full overflow-hidden bg-foreground/5">
     
        <div 
          className="h-full w-1/2 rounded-full bg-linear-to-r bg-primary" 
          style={{ animation: "topbar-slide 1.4s ease-in-out infinite" }}
        />
      </div>

      {/* Loader content */}
      <div className="relative flex flex-col items-center justify-center gap-5">

        {/* Ripple rings */}
        <div className="relative flex items-center justify-center">

          <div
            className="absolute h-10 w-10 rounded-full border-[2.5px] border-primary/30 animate-ping"
            style={{ animationDuration: "1.6s", animationDelay: "0s" }}
          />
          <div
            className="absolute h-16 w-16 rounded-full border-[1.5px] border-primary/20 animate-ping"
            style={{ animationDuration: "1.6s", animationDelay: "0.25s" }}
          />
          <div
            className="absolute h-22 w-22 rounded-full border-[1.5px] border-primary/10 animate-ping"
            style={{ animationDuration: "1.6s", animationDelay: "0.5s" }}
          />
          <div
            className="absolute h-28 w-28 rounded-full border-[1.5px] border-primary/8 animate-ping"
            style={{ animationDuration: "1.6s", animationDelay: "0.75s" }}
          />
          
        </div>

        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest animate-pulse mt-17">
          Loading...
        </p>

      </div>
    </div>
  );
}