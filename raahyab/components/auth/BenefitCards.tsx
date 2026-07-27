import { useTranslations } from 'next-intl';

interface BenefitItem {
  title: string;
  desc: string;
}

export function BenefitCards() {
  const t = useTranslations('signup');
  
  // Retrieve the raw translated array from signup.benefitCards
  const benefits = t.raw('benefitCards') as BenefitItem[];

  return (
    // Note: Removed conflicting grid classes. CSS direction handles mirroring automatically.
    <div className="flex flex-col gap-3 lg:flex-row">
      {benefits.map((b) => (
        <div 
          key={b.title} 
          className="flex-1 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md text-start"
        >
          <p className="mb-1 text-sm font-semibold text-white">{b.title}</p>
          <p className="hidden lg:block text-xs leading-relaxed text-white/75">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}
