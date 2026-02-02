"use client";

import { useEffect, useState, useRef } from "react";
import React, { JSX } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

export default function Event(): JSX.Element {
  const target = new Date("2026-02-07T08:00:00").getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setInterval(() => {
      const diff = target - Date.now();
      if (diff < 0) return;

      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(i);
  }, [target]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".countdown-card",
          {
            y: 30,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          detailsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        );

      // Pulse animation for countdown numbers
      gsap.to(".countdown-number", {
        scale: 1.05,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.25,
          repeat: -1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/riri3.jpeg" // ganti sesuai gambar yang kamu mau
          alt="Event Background"
          fill
          className="object-cover"
          quality={90}
          priority
        />

        {/* Overlay agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      </div>

      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50" />
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.03)_0%,transparent_70%)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-rose-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Top ornamental line */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-500/50 rounded-full" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/70 shadow-lg shadow-amber-500/30" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 shadow-lg shadow-amber-500/40" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/70 shadow-lg shadow-amber-500/30" />
          <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-500/50 rounded-full" />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="bg-gradient-to-br from-white via-amber-50 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
            Hitung Mundur
          </span>
        </h2>

        <p
          className="text-sm sm:text-base md:text-lg text-white/60 mb-12 sm:mb-16 md:mb-20 tracking-wider"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Menuju Hari Bahagia Kami
        </p>

        {/* Countdown Timer */}
        <div
          ref={countdownRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24"
        >
          {Object.entries({
            Hari: t.d,
            Jam: t.h,
            Menit: t.m,
            Detik: t.s,
          }).map(([label, value], index) => (
            <div
              key={label}
              className="countdown-card group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-amber-400/20 rounded-[1.5rem] sm:rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300/40">
                {/* Corner accents */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-amber-300/30 rounded-tl-lg" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-amber-300/30 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-amber-300/30 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-amber-300/30 rounded-br-lg" />

                {/* Number */}
                <div
                  className="countdown-number text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-4 bg-gradient-to-br from-amber-200 via-white to-amber-100 bg-clip-text text-transparent drop-shadow-2xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {String(value).padStart(2, "0")}
                </div>

                {/* Label */}
                <div className="relative">
                  <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-3 sm:mb-4" />
                  <div
                    className="uppercase text-xs sm:text-sm md:text-base text-white/70 tracking-[0.2em] font-medium"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Event Details Card */}
        <div
          ref={detailsRef}
          className="relative max-w-3xl mx-auto"
        >
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/10 via-rose-400/10 to-amber-400/10 rounded-[2rem] sm:rounded-[2.5rem] blur-2xl" />

          {/* Details container */}
          <div className="relative bg-white/10 backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 md:p-12 border border-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
            {/* Icon */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl" />
                <div className="relative bg-gradient-to-br from-amber-400/20 to-amber-500/20 p-4 sm:p-5 rounded-full border border-amber-300/30">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-amber-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date */}
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sabtu, 7 Februari 2026
            </h3>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-6 sm:my-8">
              <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-white/40 to-white/50 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-l from-transparent via-white/40 to-white/50 rounded-full" />
            </div>

            {/* Time */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200/80"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p
                  className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  Pukul 08.00 WITA - Sampai Selesai
                </p>
              </div>

              {/* Location hint */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-rose-200/80"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p
                  className="text-base sm:text-lg md:text-xl text-white/80 italic"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  Dusun toli - toli, desa palakka Kec.Kahu Kab.Bone
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ornamental line */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-12 sm:mt-16 md:mt-20">
          <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-rose-400/50 to-rose-500/50 rounded-full" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400/70 shadow-lg shadow-rose-500/30" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 shadow-lg shadow-rose-500/40" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400/70 shadow-lg shadow-rose-500/30" />
          <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-rose-400/50 to-rose-500/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}