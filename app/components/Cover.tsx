"use client";

import { useSearchParams } from "next/navigation";
import React, { JSX, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps): JSX.Element {
  const params = useSearchParams();
  const guest = params.get("to") || params.get("name") || "Bapak/Ibu/Saudara/i";

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ornamentTopRef = useRef<HTMLDivElement>(null);
  const ornamentBottomRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const guestNameRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(cardRef.current, {
      scale: 0.85,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
      .from(ornamentTopRef.current, { y: -40, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(ornamentBottomRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.8")
      .from(titleRef.current, { y: 25, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(photoRef.current, { scale: 0.9, opacity: 0, rotateY: 12, duration: 1 }, "-=0.6")
      .from(guestNameRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(buttonRef.current, { scale: 0.9, opacity: 0, duration: 0.6 }, "-=0.2");

    gsap.to(photoRef.current, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(ornamentTopRef.current, {
      rotate: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ornamentBottomRef.current, {
      rotate: -360,
      duration: 50,
      repeat: -1,
      ease: "none",
    });
  }, []);

  const handleOpenClick = () => {
    const tl = gsap.timeline({
      onComplete: () => onOpen(),
    });

    tl.to(buttonRef.current, { scale: 0.95, duration: 0.1 })
      .to(buttonRef.current, { scale: 1.05, duration: 0.2 })
      .to(cardRef.current, { scale: 1.1, opacity: 0, duration: 0.6, ease: "power2.in" }, "-=0.1")
      .to(containerRef.current, { opacity: 0, duration: 0.4 }, "-=0.3");
  };

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden min-h-[100svh] px-4"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 sm:scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/65 to-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className="
          relative text-center text-white
          backdrop-blur-xl
          bg-gradient-to-br from-white/12 via-white/6 to-white/12
          border border-white/25
          rounded-[1.75rem] sm:rounded-[2.25rem] md:rounded-[2.75rem]
          p-6 sm:p-8 md:p-10 lg:p-12
          shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]
          w-full max-w-[92vw]
          sm:max-w-md md:max-w-lg lg:max-w-xl
        "
      >
        {/* Ornaments */}
        <div
          ref={ornamentTopRef}
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-14 opacity-40"
        >
          <div className="w-full h-full border-2 border-amber-300/60 rounded-full" />
          <div className="absolute inset-2 border-2 border-amber-400/40 rounded-full" />
        </div>

        <div
          ref={ornamentBottomRef}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 opacity-40"
        >
          <div className="w-full h-full border-2 border-rose-300/60 rounded-full" />
          <div className="absolute inset-2 border-2 border-rose-400/40 rounded-full" />
        </div>

        <p className="tracking-[0.25em] text-[10px] sm:text-xs uppercase text-amber-200/70 font-light">
          The Wedding Of
        </p>

        <h1
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold my-4 tracking-wide bg-gradient-to-br from-white via-amber-50 to-amber-100 bg-clip-text text-transparent"
        >
          Risky Santoso
          <span className="block text-lg sm:text-xl md:text-2xl my-1 text-amber-200/90">&</span>
          Nisa Wardani
        </h1>

        {/* Photo */}
        <div
          ref={photoRef}
          className="relative mx-auto my-6 w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72"
        >
          <div className="absolute -inset-2 bg-gradient-to-br from-amber-300/20 via-rose-300/10 to-amber-300/20 rounded-[120px_120px_40px_40px] blur-xl" />
          <div className="relative w-full h-full rounded-[120px_120px_40px_40px] overflow-hidden border-2 border-white/30 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80"
              className="w-full h-full object-cover"
              alt="Couple"
            />
          </div>
        </div>

        {/* Guest */}
        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-white/70 font-light">Kepada Yth</p>
          <h2
            ref={guestNameRef}
            className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-amber-100"
          >
            {guest}
          </h2>
          <p className="text-xs sm:text-sm text-white/60 italic">Di Tempat</p>
        </div>

        {/* Button */}
        <button
          ref={buttonRef}
          onClick={handleOpenClick}
          className="group relative mt-6 px-8 sm:px-10 py-3 sm:py-4 rounded-full overflow-hidden font-semibold tracking-wide shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400" />
          <span className="relative text-slate-900 text-base sm:text-lg">
            Buka Undangan
          </span>
        </button>
      </div>
    </section>
  );
}
