"use client";

import { useEffect, useRef, useState } from "react";
import { JSX } from "react";
import { gsap } from "../lib/gsap";
import Image from "next/image";

const IMAGES = [
  "/riri1.jpeg",
  "/riri3.jpeg",
  "/riri4.jpeg",
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

      tl.from(".ornament-line", {
        scaleX: 0,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          ".ornament-circle",
          {
            scale: 0,
            rotation: -180,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.5"
        )
        .from(
          ".hero-item h1, .hero-item p",
          {
            opacity: 0,
            y: 40,
            filter: "blur(6px)",
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.3"
        );

      gsap.to(".ornament-circle", {
        scale: 1.08,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const changeBg = (url: string) => {
  if (!bgRef.current || !overlayRef.current || url === bg) return;

  // Jangan gelapkan overlay
  gsap.to(overlayRef.current, {
    opacity: 0.6, // sebelumnya 0.3
    duration: 0.2,
  });

  gsap.to(bgRef.current, {
    opacity: 0,
    scale: 1.05,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      setBg(url);
      gsap.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(overlayRef.current, {
              opacity: 0.6, // tetap terang
              duration: 0.3,
            });
          },
        }
      );
    },
  });
  };


  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 md:px-8 overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          ref={bgRef}
          className="absolute inset-0"
        >
          <Image
            src={bg}
            alt="Hero background"
            fill
            className="object-cover"
            quality={90}
            priority
          />
        </div>
        
        {/* Gradient overlays matching Cover component */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-slate-900/50 to-slate-950/60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Floral Corner Decorations - Matching Cover style */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Top Left */}
        <svg className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-6 lg:left-6 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-40" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.2">
          <path d="M10 80 Q 30 40, 60 30 T 100 10" strokeLinecap="round" />
          <path d="M15 90 Q 25 60, 50 50 T 90 35" strokeLinecap="round" />
          <circle cx="25" cy="95" r="3" fill="white" />
          <circle cx="45" cy="75" r="2.5" fill="white" />
          <circle cx="65" cy="60" r="2" fill="white" />
          <path d="M20 100 Q 35 85, 50 80 Q 45 95, 40 110 Q 30 105, 20 100 Z" fill="white" fillOpacity="0.25" />
          <path d="M50 70 Q 60 60, 70 58 Q 68 70, 65 80 Q 57 75, 50 70 Z" fill="white" fillOpacity="0.2" />
        </svg>

        {/* Top Right */}
        <svg className="absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-40" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.2" style={{ transform: 'scaleX(-1)' }}>
          <path d="M10 80 Q 30 40, 60 30 T 100 10" strokeLinecap="round" />
          <path d="M15 90 Q 25 60, 50 50 T 90 35" strokeLinecap="round" />
          <circle cx="25" cy="95" r="3" fill="white" />
          <circle cx="45" cy="75" r="2.5" fill="white" />
          <circle cx="65" cy="60" r="2" fill="white" />
          <path d="M20 100 Q 35 85, 50 80 Q 45 95, 40 110 Q 30 105, 20 100 Z" fill="white" fillOpacity="0.25" />
          <path d="M50 70 Q 60 60, 70 58 Q 68 70, 65 80 Q 57 75, 50 70 Z" fill="white" fillOpacity="0.2" />
        </svg>

        {/* Bottom Left */}
        <svg className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-40" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.2" style={{ transform: 'scaleY(-1)' }}>
          <path d="M10 80 Q 30 40, 60 30 T 100 10" strokeLinecap="round" />
          <path d="M15 90 Q 25 60, 50 50 T 90 35" strokeLinecap="round" />
          <circle cx="25" cy="95" r="3" fill="white" />
          <circle cx="45" cy="75" r="2.5" fill="white" />
          <circle cx="65" cy="60" r="2" fill="white" />
          <path d="M20 100 Q 35 85, 50 80 Q 45 95, 40 110 Q 30 105, 20 100 Z" fill="white" fillOpacity="0.25" />
          <path d="M50 70 Q 60 60, 70 58 Q 68 70, 65 80 Q 57 75, 50 70 Z" fill="white" fillOpacity="0.2" />
        </svg>

        {/* Bottom Right */}
        <svg className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-40" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.2" style={{ transform: 'scale(-1, -1)' }}>
          <path d="M10 80 Q 30 40, 60 30 T 100 10" strokeLinecap="round" />
          <path d="M15 90 Q 25 60, 50 50 T 90 35" strokeLinecap="round" />
          <circle cx="25" cy="95" r="3" fill="white" />
          <circle cx="45" cy="75" r="2.5" fill="white" />
          <circle cx="65" cy="60" r="2" fill="white" />
          <path d="M20 100 Q 35 85, 50 80 Q 45 95, 40 110 Q 30 105, 20 100 Z" fill="white" fillOpacity="0.25" />
          <path d="M50 70 Q 60 60, 70 58 Q 68 70, 65 80 Q 57 75, 50 70 Z" fill="white" fillOpacity="0.2" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl w-full px-4">
        {/* Top ornamental line */}
        <div className="hero-item flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-8">
          <div className="ornament-line h-[1.5px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-white/50 to-white/60 rounded-full" />
          <div className="ornament-circle w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60" />
          <div className="ornament-circle w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/70" />
          <div className="ornament-circle w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60" />
          <div className="ornament-line h-[1.5px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-white/50 to-white/60 rounded-full" />
        </div>

        {/* Subtitle */}
        <p 
          className="hero-item tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-xs uppercase text-white/70 mb-5 sm:mb-6 md:mb-7 font-light"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          We Are Getting Married
        </p>

        {/* Names */}
        <div className="hero-item mb-5 sm:mb-6 md:mb-8">
          <h1
            className="hero-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.02em] leading-tight mb-2 sm:mb-3 text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.45)",
            }}
          >
            A. Ikram Ramadhani
          </h1>

          <div className="flex items-center justify-center my-2 sm:my-3">
            <div className="h-px w-10 sm:w-12 md:w-16 bg-white/30" />
            <span className="mx-3 sm:mx-4 text-lg sm:text-xl md:text-2xl">🌿</span>
            <div className="h-px w-10 sm:w-12 md:w-16 bg-white/30" />
          </div>
          
          <h1
            className="hero-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.02em] leading-tight mb-2 sm:mb-3 text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.45)",
            }}
          >
            Ririswati
          </h1>
        </div>

        {/* Date */}
        <div className="hero-item mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-white/80"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <p 
              className="text-xs sm:text-sm md:text-base tracking-wide text-white font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              08 Februari 2026
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hero-item w-16 sm:w-20 h-px bg-white/20 mx-auto mb-6 sm:mb-8" />

        {/* Gallery thumbnails */}
        <div className="hero-item">
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            {choices.map((img, index) => (
              <button
                key={img}
                onClick={() => changeBg(img)}
                className={`group relative rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                  bg === img
                    ? "w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-22 ring-2 ring-white/50 shadow-lg"
                    : "w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-18 opacity-50 hover:opacity-80 hover:scale-105"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                    quality={80}
                  />
                </div>
                
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  bg === img 
                    ? "bg-gradient-to-t from-black/20 to-transparent" 
                    : "bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/30"
                }`} />
                
                {bg === img && (
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                    <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
                  </div>
                )}
                
                <div className={`absolute inset-0 border rounded-lg sm:rounded-xl transition-all duration-300 ${
                  bg === img
                    ? "border-white/40"
                    : "border-white/20 group-hover:border-white/30"
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom ornamental line */}
        <div className="hero-item flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 mt-10 sm:mt-12 md:mt-14">
          <div className="ornament-line h-[1.5px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-white/50 to-white/60 rounded-full" />
          <div className="ornament-circle w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60" />
          <div className="ornament-circle w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/70" />
          <div className="ornament-circle w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60" />
          <div className="ornament-line h-[1.5px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-white/50 to-white/60 rounded-full" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <p className="text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            SCROLL
          </p>
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 text-white/40" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}