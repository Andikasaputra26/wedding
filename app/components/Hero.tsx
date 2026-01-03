"use client";

import { useEffect, useRef } from "react";
import { JSX } from "react";
import { gsap } from "../lib/gsap";

export default function Hero(): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".flower-stem", {
        scaleY: 0,
        transformOrigin: "bottom center",
        duration: 1,
      })

        .from(
          ".flower-bloom",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )

        .from(
          ".hero-item",
          {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: 0.2,
          },
          "-=0.2"
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center text-center bg-slate-950 text-slate-100 px-6 overflow-hidden"
    >
      <div className="absolute left-8 bottom-0 flex flex-col items-center">
        <span className="flower-bloom text-slate-200 text-xl mb-2">❀</span>
        <span className="flower-stem w-[1px] h-40 bg-slate-400/40" />
      </div>

      <div className="absolute right-8 bottom-0 flex flex-col items-center">
        <span className="flower-bloom text-slate-200 text-xl mb-2">❀</span>
        <span className="flower-stem w-[1px] h-40 bg-slate-400/40" />
      </div>

      <div className="relative z-10">
        <p className="hero-item tracking-[3px] text-sm opacity-70 mb-4">
          WE ARE GETTING MARRIED
        </p>

        <h1 className="hero-item text-5xl md:text-7xl font-bold mb-6">
          Risky Santoso & Nisa Wardani
        </h1>

        <div className="hero-item w-20 h-[1px] bg-slate-400/40 mx-auto mb-6" />

        <p className="hero-item text-lg tracking-wide opacity-80">
          Sabtu, 20 Juni 2026
        </p>
      </div>
    </section>
  );
}
