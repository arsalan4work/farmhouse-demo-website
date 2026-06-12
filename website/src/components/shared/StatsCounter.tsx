"use client";

import { useState, useEffect, useRef } from "react";
import { playfairDisplay } from "@/lib/fonts";

type StatsCounterProps = {
  value: number;
  label: string;
};

export default function StatsCounter({ value, label }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated || !counterRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const end = value;
            const duration = 1000; // 1 second
            const stepTime = Math.abs(Math.floor(duration / end));

            const timer = setInterval(() => {
              start += 1;
              setCount(start);
              if (start >= end) {
                clearInterval(timer);
                setCount(end);
              }
            }, stepTime > 0 ? stepTime : 10);

            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={counterRef} className="flex flex-col items-center justify-center">
      <span
        className={`mb-2 font-bold text-[#6366F1] ${playfairDisplay.className}`}
        style={{ fontSize: "3rem" }}
      >
        {hasAnimated ? count : 0}+
      </span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}
