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
  const decorLineTopRef = useRef<HTMLDivElement>(null);
  const decorLineBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const guestName = params.get("to") || params.get("name") || "Bapak/Ibu/Saudara/i";
    setGuest(guestName);
  }, [params]);

  useEffect(() => {
    if (!mounted) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      cardRef.current,
      {
        scale: 0.7,
        opacity: 0,
        y: 50,
        rotationX: -15,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.4,
        ease: "power4.out",
      }
    )
      .fromTo(
        ornamentTopRef.current,
        {
          y: -60,
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
        },
        "-=1"
      )
      .fromTo(
        decorLineTopRef.current,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.7"
      )
      .fromTo(
        titleRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .fromTo(
        photoRef.current,
        {
          scale: 0.8,
          opacity: 0,
          rotationY: 90,
          z: -100,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          z: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.8"
      )
      .fromTo(
        guestNameRef.current,
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .fromTo(
        ornamentBottomRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.5,
          rotation: 180,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.8"
      )
      .fromTo(
        decorLineBottomRef.current,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.9"
      )
      .fromTo(
        buttonRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "back.out(1.4)",
        },
        "-=0.4"
      );

    gsap.to(photoRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(photoRef.current, {
      scale: 1.02,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(ornamentTopRef.current, {
      rotate: 360,
      duration: 50,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ornamentBottomRef.current, {
      rotate: -360,
      duration: 60,
      repeat: -1,
      ease: "none",
    });

    gsap.to(buttonRef.current, {
      boxShadow: "0 10px 40px -10px rgba(251, 191, 36, 0.6)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [mounted]);

  const handleOpenClick = () => {
    const tl = gsap.timeline({
      onComplete: () => onOpen(),
    });

    tl.to(buttonRef.current, {
      scale: 0.92,
      duration: 0.1,
      ease: "power2.in",
    })
      .to(buttonRef.current, {
        scale: 1.08,
        duration: 0.15,
        ease: "power2.out",
      })
      .to(
        cardRef.current,
        {
          scale: 1.15,
          opacity: 0,
          rotationY: 15,
          duration: 0.7,
          ease: "power3.in",
        },
        "-=0.1"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        "-=0.5"
      );
  };

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/85 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-amber-500/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-rose-500/15 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div
        ref={cardRef}
        className="relative text-center text-white backdrop-blur-2xl bg-gradient-to-br from-white/12 via-white/8 to-white/12 border border-white/25 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 md:p-8 shadow-[0_50px_120px_-25px_rgba(0,0,0,0.8)] w-full max-w-[320px] sm:max-w-[340px] md:max-w-[380px]"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={ornamentTopRef}
          className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 opacity-70"
        >
          <div className="w-full h-full border-[2.5px] border-amber-300/70 rounded-full shadow-lg" />
          <div className="absolute inset-2 border-[2px] border-amber-400/50 rounded-full" />
          <div className="absolute inset-3.5 border-[1px] border-amber-300/30 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-amber-300 rounded-full shadow-xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-amber-300/50 rounded-full blur-md" />
        </div>

        <div
          ref={ornamentBottomRef}
          className="absolute -bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 opacity-70"
        >
          <div className="w-full h-full border-[2.5px] border-rose-300/70 rounded-full shadow-lg" />
          <div className="absolute inset-2 border-[2px] border-rose-400/50 rounded-full" />
          <div className="absolute inset-3.5 border-[1px] border-rose-300/30 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-rose-300 rounded-full shadow-xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-rose-300/50 rounded-full blur-md" />
        </div>

        <div ref={decorLineTopRef} className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-r from-transparent via-amber-300/60 to-amber-400/60 rounded-full shadow-sm" />
          <div className="text-amber-300/80 text-lg sm:text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>✦</div>
          <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-l from-transparent via-amber-300/60 to-amber-400/60 rounded-full shadow-sm" />
        </div>

        <p
          className="tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-[11px] uppercase text-amber-200/80 font-light mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Wedding Of
        </p>

        <h1
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-[2rem] font-bold mb-4 sm:mb-5 tracking-wide px-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="bg-gradient-to-br from-white via-amber-50 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
            Risky Santoso
          </span>
          <span className="block text-xl sm:text-2xl my-1.5 sm:my-2 text-amber-200/90">&</span>
          <span className="bg-gradient-to-br from-white via-rose-50 to-rose-100 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(251,113,133,0.3)]">
            Nisa Wardani
          </span>
        </h1>

        <div
          ref={photoRef}
          className="relative mx-auto my-5 sm:my-6 w-32 h-40 sm:w-36 sm:h-44"
        >
          <div className="absolute -inset-2.5 bg-gradient-to-br from-amber-300/40 via-rose-300/30 to-amber-300/40 rounded-[100px_100px_35px_35px] sm:rounded-[110px_110px_40px_40px] blur-2xl opacity-80" />
          
          <div className="relative w-full h-full rounded-[90px_90px_30px_30px] sm:rounded-[100px_100px_35px_35px] overflow-hidden border-[3px] border-white/40 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.7)]">
            <img
              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80"
              className="w-full h-full object-cover"
              alt="Couple"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300/5 via-transparent to-rose-300/5" />
          </div>

          <div className="absolute -top-2 -left-2 w-6 h-6 sm:w-7 sm:h-7 border-t-[2.5px] border-l-[2.5px] border-amber-300/60 rounded-tl-2xl shadow-lg" />
          <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 border-t-[2.5px] border-r-[2.5px] border-amber-300/60 rounded-tr-2xl shadow-lg" />
        </div>

        <div className="space-y-2 mb-5 sm:mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="h-[1.5px] w-8 sm:w-10 bg-gradient-to-r from-transparent to-white/40 rounded-full" />
            <p className="text-[11px] sm:text-xs text-white/80 font-light tracking-wide" style={{ fontFamily: "'Crimson Text', serif" }}>
              Kepada Yth
            </p>
            <div className="h-[1.5px] w-8 sm:w-10 bg-gradient-to-l from-transparent to-white/40 rounded-full" />
          </div>
          
          <h2
            ref={guestNameRef}
            className="text-lg sm:text-xl md:text-[1.4rem] font-semibold tracking-wide text-amber-100 drop-shadow-lg px-3 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {guest}
          </h2>
          
          <p className="text-[11px] sm:text-xs text-white/75 font-light italic tracking-wide" style={{ fontFamily: "'Crimson Text', serif" }}>
            Di Tempat
          </p>
        </div>

        <button
          ref={buttonRef}
          onClick={handleOpenClick}
          className="relative w-full px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-bold text-sm sm:text-base tracking-wide bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-900 shadow-[0_15px_40px_-10px_rgba(251,191,36,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(251,191,36,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          <span className="relative z-10">Buka Undangan</span>
          
          <svg
            className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
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

        <div ref={decorLineBottomRef} className="flex items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-6">
          <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-r from-transparent via-rose-300/60 to-rose-400/60 rounded-full shadow-sm" />
          <div className="text-rose-300/80 text-lg sm:text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>✦</div>
          <div className="h-[1.5px] w-10 sm:w-12 bg-gradient-to-l from-transparent via-rose-300/60 to-rose-400/60 rounded-full shadow-sm" />
        </div>
      </div>
    </section>
  );
}