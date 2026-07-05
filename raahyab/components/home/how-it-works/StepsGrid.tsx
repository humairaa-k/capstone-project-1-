import { steps } from "./StepsData";
import StepCard from "./StepCard";

export default function StepsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {steps.map((step) => (
        <StepCard key={step.id} {...step} />
      ))}
    </div>
  )
}

