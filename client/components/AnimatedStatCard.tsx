import React, { useEffect, useRef, useState } from "react";

interface AnimatedStatCardProps {
  number: string | number;
  label: string;
  duration?: number;
}

export const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({
  number,
  label,
  duration = 2000,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Extract numeric value
          const numericValue = parseInt(String(number).replace(/\D/g, ""), 10);
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(numericValue * progress);
            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(numericValue);
            }
          };

          animate();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [number, duration]);

  const displayText = String(number).includes("+")
    ? `${displayValue}+`
    : String(number).includes("★")
    ? `${(displayValue / 100).toFixed(1)}★`
    : String(number).includes("%")
    ? `${displayValue}%`
    : displayValue;

  return (
    <div ref={elementRef} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {displayText}
      </div>
      <p className="text-sm md:text-base text-muted-foreground">{label}</p>
    </div>
  );
};

export default AnimatedStatCard;
