"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function OurSpecialDay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ornamentTopRef = useRef<HTMLDivElement>(null);
  const ornamentBottomRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const verseRef = useRef<HTMLParagraphElement>(null);
  const sourceRef = useRef<HTMLParagraphElement>(null);
  const decorLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Sophisticated entrance sequence
    tl.from(containerRef.current, {
      opacity: 0,
      duration: 1,
    })
      .from(
        ornamentTopRef.current,
        {
          y: -40,
          opacity: 0,
          scale: 0.7,
          rotation: -45,
          duration: 1.2,
        },
        "-=0.5"
      )
      .from(
        decorLineRef.current?.children || [],
        {
          scaleX: 0,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.6"
      )
      .from(
        titleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      )
      .from(
        verseRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1.2,
        },
        "-=0.4"
      )
      .from(
        sourceRef.current,
        {
          y: 15,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.3"
      )
      .from(
        ornamentBottomRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.7,
          rotation: 45,
          duration: 1.2,
        },
        "-=0.6"
      );

    // Floating animations
    gsap.to(ornamentTopRef.current, {
      y: -12,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(ornamentBottomRef.current, {
      y: 12,
      rotation: -5,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Subtle rotation for ornaments
    gsap.to(ornamentTopRef.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ornamentBottomRef.current, {
      rotation: -360,
      duration: 70,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/riri1.jpeg" // ganti sesuai gambar yang kamu mau
          alt="Our Special Day Background"
          fill
          className="object-cover"
          quality={90}
          priority
        />

        {/* Overlay agar teks tetap jelas */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/5 via-transparent to-rose-900/10" />
        
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-rose-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content container with glassmorphism */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="relative backdrop-blur-sm bg-white/5 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] p-8 sm:p-12 md:p-16 lg:p-20 border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]">
          {/* Top ornament */}
          <div
            ref={ornamentTopRef}
            className="absolute -top-8 sm:-top-10 md:-top-12 left-1/2 -translate-x-1/2 text-white/90"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-2xl"
            >
              {/* Elegant floral ornament */}
              <circle cx="32" cy="32" r="8" fill="white" opacity="0.2" />
              <circle cx="32" cy="32" r="5" fill="white" opacity="0.3" />
              <path
                d="M20 44C28 34 40 28 44 12C52 28 40 48 20 52"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M24 36C28 30 34 26 36 18"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M44 44C36 34 24 28 20 12C12 28 24 48 44 52"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M40 36C36 30 30 26 28 18"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Bottom ornament */}
          <div
            ref={ornamentBottomRef}
            className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 text-white/90"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-2xl rotate-180"
            >
              <circle cx="32" cy="32" r="8" fill="white" opacity="0.2" />
              <circle cx="32" cy="32" r="5" fill="white" opacity="0.3" />
              <path
                d="M20 44C28 34 40 28 44 12C52 28 40 48 20 52"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M24 36C28 30 34 26 36 18"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M44 44C36 34 24 28 20 12C12 28 24 48 44 52"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M40 36C36 30 30 26 28 18"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>

          <div className="text-center text-white">
            {/* Top decorative line */}
            <div
              ref={decorLineRef}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
            >
              <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-white/40 to-white/50 rounded-full" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/60 shadow-lg shadow-white/30" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/70 shadow-lg shadow-white/40" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/60 shadow-lg shadow-white/30" />
              <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-white/40 to-white/50 rounded-full" />
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide mb-10 sm:mb-12 md:mb-16 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="bg-gradient-to-br from-white via-amber-50 to-white bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
                Our Special Day
              </span>
            </h2>

            {/* Verse container with enhanced styling */}
            <div className="relative max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
              {/* Decorative quote marks */}
              <div className="absolute -top-4 sm:-top-6 -left-2 sm:-left-4 text-5xl sm:text-6xl md:text-7xl text-white/10 font-serif leading-none">
                "
              </div>
              <div className="absolute -bottom-8 sm:-bottom-10 -right-2 sm:-right-4 text-5xl sm:text-6xl md:text-7xl text-white/10 font-serif leading-none">
                "
              </div>

              {/* Verse text */}
              <p
                ref={verseRef}
                className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed sm:leading-loose md:leading-loose text-white/95 px-4 sm:px-8 md:px-12 relative"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  fontStyle: "italic",
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
                pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
                dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
                kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar
                terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
              </p>
            </div>

            {/* Source badge */}
            <div
              ref={sourceRef}
              className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/80"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wide text-white/90"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                QS. Ar-Rum: 21
              </p>
            </div>

            {/* Bottom decorative line */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12 md:mt-14">
              <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-white/40 to-white/50 rounded-full" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/60 shadow-lg shadow-white/30" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/70 shadow-lg shadow-white/40" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/60 shadow-lg shadow-white/30" />
              <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-white/40 to-white/50 rounded-full" />
            </div>
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 md:top-10 md:left-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-white/20 rounded-tl-2xl" />
          </div>
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-10 md:right-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-t-2 border-r-2 border-white/20 rounded-tr-2xl" />
          </div>
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-b-2 border-l-2 border-white/20 rounded-bl-2xl" />
          </div>
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-white/20 rounded-br-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}