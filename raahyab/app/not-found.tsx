import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <style>{`
        @keyframes compass-search {
          0%, 100% { transform: rotate(-18deg); }
          50% { transform: rotate(18deg); }
        }
        @keyframes ping-soft {
          0% { transform: scale(0.9); opacity: 0.5; }
          80%, 100% { transform: scale(1.6); opacity: 0; }
        }
        .compass-needle {
          animation: compass-search 2.8s ease-in-out infinite;
          transform-origin: center;
        }
        .ping-ring {
          animation: ping-soft 2.8s ease-out infinite;
        }
      `}</style>

      <div className="max-w-lg w-full text-center">

        <div className="relative h-24 w-24 mx-auto mb-10 flex items-center justify-center">
          <span className="ping-ring absolute inset-0 rounded-full border-2 border-primary/30" />
          <div className="relative h-20 w-20 rounded-full border border-foreground/10 bg-card shadow-sm flex items-center justify-center">
            <Compass className="compass-needle h-9 w-9 text-primary" strokeWidth={1.75} />
          </div>
        </div>

        <p
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-7xl sm:text-8xl italic text-foreground leading-none mb-4"
        >
          404
        </p>

        <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
          We couldn't find your way from here.
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or the link
          might be outdated. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/opportunities"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
          >
            <Compass className="h-4 w-4" />
            Browse Opportunities
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-2xl border border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/20 font-medium px-6 py-3 text-sm transition-all duration-200"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}