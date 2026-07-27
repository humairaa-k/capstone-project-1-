export default function HeroBackground() {
  return (
    <>
      {/* Afghan pattern — top, inline-end side  */}
      <div className="absolute top-0 end-0 w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <pattern
              id="afghan1"
              x="0" y="0"
              width="50" height="50"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="17" y="17" width="16" height="16"
                fill="none" stroke="#0F766E" strokeWidth="1"
                transform="rotate(45 25 25)"
              />
              <rect
                x="20" y="20" width="10" height="10"
                fill="none" stroke="#D97706" strokeWidth="0.5"
                transform="rotate(45 25 25)"
              />
              <circle cx="25" cy="25" r="2" fill="#0F766E" />
              <circle cx="0" cy="0" r="2" fill="#D97706" />
              <circle cx="50" cy="0" r="2" fill="#D97706" />
              <circle cx="0" cy="50" r="2" fill="#D97706" />
              <circle cx="50" cy="50" r="2" fill="#D97706" />
              <line x1="0" y1="25" x2="17" y2="25" stroke="#0F766E" strokeWidth="0.5" opacity="0.5" />
              <line x1="33" y1="25" x2="50" y2="25" stroke="#0F766E" strokeWidth="0.5" opacity="0.5" />
              <line x1="25" y1="0" x2="25" y2="17" stroke="#0F766E" strokeWidth="0.5" opacity="0.5" />
              <line x1="25" y1="33" x2="25" y2="50" stroke="#0F766E" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#afghan1)" />
        </svg>
      </div>

      {/* Afghan pattern — bottom, inline-start side */}
      <div className="absolute bottom-0 start-0 w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 280 280" className="w-full h-full">
          <defs>
            <pattern
              id="afghan2"
              x="0" y="0"
              width="40" height="40"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="20,2 38,20 20,38 2,20"
                fill="none" stroke="#D97706" strokeWidth="0.8"
              />
              <polygon
                points="20,10 30,20 20,30 10,20"
                fill="none" stroke="#0F766E" strokeWidth="0.5"
              />
              <circle cx="20" cy="20" r="2" fill="#D97706" />
            </pattern>
          </defs>
          <rect width="280" height="280" fill="url(#afghan2)" />
        </svg>
      </div>
    </>
  );
}