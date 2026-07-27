import { steps } from "./StepsData";
import StepCard from "./StepCard";
import { useTranslations } from "next-intl";


export default function StepsGrid() {
  const t = useTranslations("howItWorks")
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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

