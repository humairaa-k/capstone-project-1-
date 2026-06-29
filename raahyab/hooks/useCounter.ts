import { useEffect, useState } from "react";

export function useCounter( target: number, duration:number= 1600, delay:number= 0 ) {
    const [count, setCount ] = useState(0);

    useEffect(() => {
      let frameId: number;
      let timeoutId: ReturnType<typeof setTimeout>;

      setCount(0);

      timeoutId = setTimeout(() => {
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);

          setCount(Math.round(target * progress));

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          }
        }

        frameId = requestAnimationFrame(animate);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(frameId);
      }

    },[target, duration, delay])

    return count;
}
