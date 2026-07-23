export function BenefitCards() {

  const benefits = [
      {
      title: "Stay Organized",
      desc: "Save opportunities, track applications, and manage your career journey.",
    },
    {
      title: "Track Deadlines",
      desc: "View application deadlines and prioritize opportunities before they expire.",
    },
    {
      title: "Grow Your Career",
      desc: "Explore opportunities that help you grow your skills, education, and career.",
    },
  ];

  return (
    <div className="flex flex-col gap-3 lg:flex-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {benefits.map((b) => (
        <div
          key={b.title}
          className="flex-1 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
        >
          <p className="mb-1 text-sm font-semibold text-white">{b.title}</p>
          <p className="hidden lg:block text-xs leading-relaxed text-white/75">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}