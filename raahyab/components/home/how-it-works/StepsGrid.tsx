import { steps } from "./StepsData";
import StepCard from "./StepCard";
import { useTranslations } from "next-intl";


export default function StepsGrid() {
  const t = useTranslations("howItWorks")
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <div className="hidden md:block absolute top-14 left-[16.5%] right-[16.5%] h-px border-t-2 border-dashed border-primary/25" />

          {steps.map((step) => (
            <StepCard 
            key={step.id}
            icon={step.icon}
            number={step.number}
            title={t(`${step.key}.title`)}
            description={t(`${step.key}.description`)}
            />
          ))}
      </div>
  )
}

