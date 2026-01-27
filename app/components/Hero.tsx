"use client";

import { useEffect, useRef, useState } from "react";
import { JSX } from "react";
import { gsap } from "../lib/gsap";

const IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&q=80",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&q=80",
  "https://images.unsplash.com/photo-1520975922284-7b9587dd0fda?w=1920&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80",
];

function pickRandom(arr: string[], count: number) {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function Hero(): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [choices] = useState(() => pickRandom(IMAGES, 3));
  const [bg, setBg] = useState(choices[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Sophisticated entrance animation
      tl.from(".ornament-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .from(
          ".ornament-circle",
          {
            scale: 0,
            rotation: -180,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.6"
        )
        .from(
          ".flower-stem",
          {
            scaleY: 0,
            transformOrigin: "bottom center",
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .from(
          ".flower-bloom",
          {
            scale: 0,
            opacity: 0,
            rotation: -90,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.5"
        )
        .from(
          ".hero-item",
          {
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.15,
          },
          "-=0.6"
        );

      // Floating animation for flowers
      gsap.to(".flower-bloom", {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Subtle scale animation for ornaments
      gsap.to(".ornament-circle", {
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const changeBg = (url: string) => {
    if (!bgRef.current || !overlayRef.current || url === bg) return;

    gsap.to(overlayRef.current, {
      opacity: 0.3,
      duration: 0.2,
    });

    gsap.to(bgRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setBg(url);
        gsap.fromTo(
          bgRef.current,
          { opacity: 0, scale: 1.1 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            ease: "power2.out",
            onComplete: () => {
              gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
              });
            }
          }
        );
      },
    });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Background with enhanced effects */}
      <div className="absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('${bg}')` }}
        />
        {/* Multi-layer gradient overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-slate-950/80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/5 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-rose-500/5 rounded-full blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative ornamental flowers - Left side */}
      <div className="absolute left-4 sm:left-6 md:left-10 lg:left-16 bottom-0 flex flex-col items-center gap-3 sm:gap-4">
        {/* Top flower */}
        <div className="flex flex-col items-center">
          <span className="flower-bloom text-amber-200/80 text-2xl sm:text-3xl md:text-4xl drop-shadow-lg">
            ✿
          </span>
          <span className="flower-stem w-[2px] h-20 sm:h-28 md:h-36 bg-gradient-to-b from-amber-300/40 via-amber-200/30 to-transparent rounded-full" />
        </div>
        
        {/* Main flower */}
        <div className="flex flex-col items-center">
          <span className="flower-bloom text-amber-100 text-3xl sm:text-4xl md:text-5xl drop-shadow-2xl">
            ✿
          </span>
          <span className="flower-stem w-[2px] h-32 sm:h-44 md:h-56 bg-gradient-to-b from-amber-200/50 via-amber-300/40 to-transparent rounded-full" />
        </div>
      </div>

      {/* Decorative ornamental flowers - Right side */}
      <div className="absolute right-4 sm:right-6 md:right-10 lg:right-16 bottom-0 flex flex-col items-center gap-3 sm:gap-4">
        {/* Top flower */}
        <div className="flex flex-col items-center">
          <span className="flower-bloom text-rose-200/80 text-2xl sm:text-3xl md:text-4xl drop-shadow-lg">
            ✿
          </span>
          <span className="flower-stem w-[2px] h-20 sm:h-28 md:h-36 bg-gradient-to-b from-rose-300/40 via-rose-200/30 to-transparent rounded-full" />
        </div>
        
        {/* Main flower */}
        <div className="flex flex-col items-center">
          <span className="flower-bloom text-rose-100 text-3xl sm:text-4xl md:text-5xl drop-shadow-2xl">
            ✿
          </span>
          <span className="flower-stem w-[2px] h-32 sm:h-44 md:h-56 bg-gradient-to-b from-rose-200/50 via-rose-300/40 to-transparent rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full px-4">
        {/* Top ornamental line */}
        <div className="hero-item flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="ornament-line h-[2px] w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-amber-300/60 to-amber-400/60 rounded-full" />
          <div className="ornament-circle w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300/70 shadow-lg shadow-amber-500/30" />
          <div className="ornament-circle w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-amber-400/80 shadow-lg shadow-amber-500/40" />
          <div className="ornament-circle w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300/70 shadow-lg shadow-amber-500/30" />
          <div className="ornament-line h-[2px] w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-amber-300/60 to-amber-400/60 rounded-full" />
        </div>

        {/* Subtitle */}
        <p 
          className="hero-item tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase text-amber-100/70 mb-6 sm:mb-8 font-light"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          We Are Getting Married
        </p>

        {/* Names */}
        <h1 
          className="hero-item text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 md:mb-10 leading-tight tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="bg-gradient-to-br from-white via-amber-50 to-amber-100 bg-clip-text text-transparent drop-shadow-2xl">
            Risky Santoso
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl my-2 sm:my-3 md:my-4 text-amber-200/90">
            &
          </span>
          <span className="bg-gradient-to-br from-white via-rose-50 to-rose-100 bg-clip-text text-transparent drop-shadow-2xl">
            Nisa Wardani
          </span>
        </h1>

        {/* Divider */}
        <div className="hero-item flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
          <div className="h-[1.5px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-white/40 to-white/50 rounded-full" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/60" />
          <div className="h-[1.5px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-white/40 to-white/50 rounded-full" />
        </div>

        {/* Date */}
        <div className="hero-item mb-10 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl tracking-wide text-white font-semibold"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Sabtu, 20 Juni 2026
            </p>
          </div>
        </div>

        {/* Gallery thumbnails with enhanced design */}
        <div className="hero-item">
          <p 
            className="text-xs sm:text-sm text-white/60 mb-4 sm:mb-5 tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Pilih Galeri
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4">
            {choices.map((img, index) => (
              <button
                key={img}
                onClick={() => changeBg(img)}
                className={`group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                  bg === img
                    ? "w-20 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 ring-2 sm:ring-[3px] ring-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                    : "w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                {/* Image */}
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  bg === img 
                    ? "bg-gradient-to-t from-amber-900/30 to-transparent" 
                    : "bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/30"
                }`} />
                
                {/* Active indicator */}
                {bg === img && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300 shadow-lg shadow-amber-500/50" />
                  </div>
                )}
                
                {/* Border */}
                <div className={`absolute inset-0 border transition-all duration-300 rounded-xl sm:rounded-2xl ${
                  bg === img
                    ? "border-amber-300/50"
                    : "border-white/20 group-hover:border-white/40"
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom ornamental line */}
        <div className="hero-item flex items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12 md:mt-14">
          <div className="ornament-line h-[2px] w-16 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-rose-300/60 to-rose-400/60 rounded-full" />
          <div className="ornament-circle w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-300/70 shadow-lg shadow-rose-500/30" />
          <div className="ornament-circle w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-rose-400/80 shadow-lg shadow-rose-500/40" />
          <div className="ornament-circle w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-300/70 shadow-lg shadow-rose-500/30" />
          <div className="ornament-line h-[2px] w-16 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-rose-300/60 to-rose-400/60 rounded-full" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] sm:text-xs text-white/50 tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            SCROLL
          </p>
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/50" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}