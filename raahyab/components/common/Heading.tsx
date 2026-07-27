
interface PageHeadingProps {
  title: string;
  highlight: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeading({
  title,
  highlight,
  subtitle,
  className=""
}: PageHeadingProps) {
  return (
    <div className={`relative w-full pt-23 pb-8 px-8  ${className}`}>

  {/* borders top & bottom  */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, rgba(15,118,110,0.3) 0%, rgba(217,119,6,0.2) 50%, transparent 100%)"
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, rgba(15,118,110,0.3) 0%, rgba(217,119,6,0.2) 50%, transparent 100%)"
        }}
      />

      {/* Gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(15,118,110,0.03) 0%, rgba(217,119,6,0.03) 50%, rgba(204,251,241,0.05) 100%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-6  pr-4 ">
        
        <div>
          <h1 className="text-4xl sm:text-5xl italic font-bold text-foreground/86 leading-tight">
            {title}{" "}
            <span
              style={{ fontFamily: "var(--font-dm-serif)" }}
              className="italic text-primary"
            >
              {highlight}
            </span>
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

    </div>
  );
}