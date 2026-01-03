"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-item", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
