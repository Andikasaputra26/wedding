"use client";

import { useSearchParams } from "next/navigation";
import React, { JSX, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps): JSX.Element {
  const params = useSearchParams();
  const [guest, setGuest] = useState("Bapak/Ibu/Saudara/i");
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ornamentTopRef = useRef<HTMLDivElement>(null);
  const ornamentBottomRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const guestNameRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const guestName = params.get("to") || params.get("name") || "Bapak/Ibu/Saudara/i";
    setGuest(guestName);
  }, [params]);

  useEffect(() => {
    if (!mounted) return;

    // Initial animation sequence
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(cardRef.current, {
      scale: 0.85,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
      .from(
        ornamentTopRef.current,
        {
          y: -40,
          opacity: 0,
          scale: 0.8,
          rotation: -45,
          duration: 0.8,
        },
        "-=0.6"
      )
      .from(
        ornamentBottomRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.8,
          rotation: 45,
          duration: 0.8,
        },
        "-=0.8"
      )
      .from(
        titleRef.current,
        {
          y: 25,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        photoRef.current,
        {
          scale: 0.9,
          opacity: 0,
          rotateY: 12,
          duration: 1,
        },
        "-=0.6"
      )
      .from(
        guestNameRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        buttonRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.2"
      );

    // Floating animation for photo
    gsap.to(photoRef.current, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Subtle rotation animation for ornaments
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
  }, [mounted]);

  const handleOpenClick = () => {
    // Animate out before calling onOpen
    const tl = gsap.timeline({
      onComplete: () => onOpen(),
    });

    tl.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
    })
      .to(buttonRef.current, {
        scale: 1.05,
        duration: 0.2,
      })
      .to(
        cardRef.current,
        {
          scale: 1.1,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        },
        "-=0.1"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
        },
        "-=0.3"
      );
  };

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Background with enhanced effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 sm:scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')",
          }}
        />
        {/* Multi-layered overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/75 to-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-rose-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Main Card */}
      <div
        ref={cardRef}
        className="relative text-center text-white backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-8 sm:p-10 md:p-12 lg:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] w-full max-w-[90vw] sm:max-w-md md:max-w-lg"
      >
        {/* Top Ornament */}
        <div
          ref={ornamentTopRef}
          className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 opacity-60"
        >
          <div className="w-full h-full border-2 border-amber-300/60 rounded-full" />
          <div className="absolute inset-2 border-2 border-amber-400/40 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-amber-300/80 rounded-full shadow-lg" />
        </div>

        {/* Bottom Ornament */}
        <div
          ref={ornamentBottomRef}
          className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 opacity-60"
        >
          <div className="w-full h-full border-2 border-rose-300/60 rounded-full" />
          <div className="absolute inset-2 border-2 border-rose-400/40 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-rose-300/80 rounded-full shadow-lg" />
        </div>

        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-r from-transparent via-amber-300/50 to-amber-400/50 rounded-full" />
          <div className="text-amber-300/70 text-lg sm:text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>✦</div>
          <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-l from-transparent via-amber-300/50 to-amber-400/50 rounded-full" />
        </div>

        <p
          className="tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-xs uppercase text-amber-200/70 font-light mb-4 sm:mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Wedding Of
        </p>

        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 tracking-wide px-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="bg-gradient-to-br from-white via-amber-50 to-amber-100 bg-clip-text text-transparent drop-shadow-2xl">
            Risky Santoso
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl my-2 sm:my-3 text-amber-200/90">&</span>
          <span className="bg-gradient-to-br from-white via-rose-50 to-rose-100 bg-clip-text text-transparent drop-shadow-2xl">
            Nisa Wardani
          </span>
        </h1>

        {/* Photo frame with enhanced styling */}
        <div
          ref={photoRef}
          className="relative mx-auto my-8 sm:my-10 w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-80"
        >
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-br from-amber-300/30 via-rose-300/20 to-amber-300/30 rounded-[140px_140px_50px_50px] sm:rounded-[160px_160px_60px_60px] blur-xl" />
          
          {/* Photo container */}
          <div className="relative w-full h-full rounded-[130px_130px_45px_45px] sm:rounded-[150px_150px_55px_55px] overflow-hidden border-[3px] border-white/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <img
              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80"
              className="w-full h-full object-cover"
              alt="Couple"
            />
            {/* Photo overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
          </div>

          {/* Decorative corners */}
          <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-amber-300/50 rounded-tl-2xl" />
          <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-amber-300/50 rounded-tr-2xl" />
        </div>

        {/* Guest Info */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 sm:w-10 bg-gradient-to-r from-transparent to-white/30" />
            <p className="text-xs sm:text-sm text-white/70 font-light" style={{ fontFamily: "'Crimson Text', serif" }}>
              Kepada Yth
            </p>
            <div className="h-[1px] w-8 sm:w-10 bg-gradient-to-l from-transparent to-white/30" />
          </div>
          
          <h2
            ref={guestNameRef}
            className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-amber-100 drop-shadow-lg px-4 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {guest}
          </h2>
          
          <p className="text-xs sm:text-sm text-white/70 font-light italic" style={{ fontFamily: "'Crimson Text', serif" }}>
            Di Tempat
          </p>
        </div>

        {/* Button with enhanced styling */}
        <button
          ref={buttonRef}
          onClick={handleOpenClick}
          className="relative w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg tracking-wide bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Buka Undangan
          <svg
            className="inline-block w-5 h-5 sm:w-6 sm:h-6 ml-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
          <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-r from-transparent via-rose-300/50 to-rose-400/50 rounded-full" />
          <div className="text-rose-300/70 text-lg sm:text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>✦</div>
          <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-l from-transparent via-rose-300/50 to-rose-400/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}