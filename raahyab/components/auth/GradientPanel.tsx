export function GradientPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px]  bg-[radial-gradient(circle_at_85%_30%,#99F6E4_0%,#2DD4BF_14%,var(--color-primary)_75%,#115E56_100%)]
     sm:bg-[radial-gradient(circle_at_65%_30%,#99F6E4_0%,#2DD4BF_35%,var(--color-primary)_75%,#115E56_100%">
      <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
        {children}
      </div>
    </div>
  );
}
