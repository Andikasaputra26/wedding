"use client";

import { useSearchParams } from "next/navigation";
import React, { JSX, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps): JSX.Element {
  const params = useSearchParams();
  const [guest, setGuest] = useState("Bapak/Ibu/Saudara/i");
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const floralsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const guestName = params.get("to") || params.get("name") || "Nama Tamu";
    setGuest(guestName);
  }, [params]);

  useEffect(() => {
    if (!mounted) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
      .fromTo(
        floralsRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.3"
      )
      .fromTo(
        photoRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2 },
        "-=0.8"
      )
      .fromTo(
        namesRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        dateRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        guestRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.3"
      );

    gsap.to(buttonRef.current, {
      boxShadow: "0 8px 30px -8px rgba(255, 255, 255, 0.5)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [mounted]);

  const handleOpenClick = () => {
    const tl = gsap.timeline({ onComplete: () => onOpen() });

    tl.to(buttonRef.current, { scale: 0.95, duration: 0.1 })
      .to(buttonRef.current, { scale: 1.05, duration: 0.15 })
      .to(containerRef.current, { opacity: 0, duration: 0.5 });
  };

  return (
    <section
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-black overflow-hidden"
    >
      {/* Floral Corner Decorations */}
      <div ref={floralsRef} className="absolute inset-0 pointer-events-none z-10">
        {/* Top Left Floral */}
        <svg className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-6 lg:left-6 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 opacity-50" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.2">
          <path d="M10 80 Q 30 40, 60 30 T 100 10" strokeLinecap="round" />
          <path d="M15 90 Q 25 60, 50 50 T 90 35" strokeLinecap="round" />
          <circle cx="25" cy="95" r="3" fill="white" />
          <circle cx="45" cy="75" r="2.5" fill="white" />
          <circle cx="65" cy="60" r="2" fill="white" />
          <path d="M20 100 Q 35 85, 50 80 Q 45 95, 40 110 Q 30 105, 20 100 Z" fill="white" fillOpacity="0.25" />
          <path d="M50 70 Q 60 60, 70 58 Q 68 70, 65 80 Q 57 75, 50 70 Z" fill="white" fillOpacity="0.2" />
          <path d="M75 50 Q 82 43, 90 42 Q 88 52, 85 60 Q 79 54, 75 50 Z" fill="white" fillOpacity="0.15" />
        </svg>

        {/* Top Right Floral */}
        <svg className="absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 opacity-50" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.2" style={{ transform: 'scaleX(-1)' }}>
          <path d="M10 80 Q 30 40, 60 30 T 100 10" strokeLinecap="round" />
          <path d="M15 90 Q 25 60, 50 50 T 90 35" strokeLinecap="round" />
          <circle cx="25" cy="95" r="3" fill="white" />
          <circle cx="45" cy="75" r="2.5" fill="white" />
          <circle cx="65" cy="60" r="2" fill="white" />
          <path d="M20 100 Q 35 85, 50 80 Q 45 95, 40 110 Q 30 105, 20 100 Z" fill="white" fillOpacity="0.25" />
          <path d="M50 70 Q 60 60, 70 58 Q 68 70, 65 80 Q 57 75, 50 70 Z" fill="white" fillOpacity="0.2" />
          <path d="M75 50 Q 82 43, 90 42 Q 88 52, 85 60 Q 79 54, 75 50 Z" fill="white" fillOpacity="0.15" />
        </svg>

        {/* Bottom Left Floral */}
        <svg className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 opacity-50" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.2" style={{ transform: 'scaleY(-1)' }}>
          <path d="M10 80 Q 30 40, 60 30 T 100 10" strokeLinecap="round" />
          <path d="M15 90 Q 25 60, 50 50 T 90 35" strokeLinecap="round" />
          <circle cx="25" cy="95" r="3" fill="white" />
          <circle cx="45" cy="75" r="2.5" fill="white" />
          <circle cx="65" cy="60" r="2" fill="white" />
          <path d="M20 100 Q 35 85, 50 80 Q 45 95, 40 110 Q 30 105, 20 100 Z" fill="white" fillOpacity="0.25" />
          <path d="M50 70 Q 60 60, 70 58 Q 68 70, 65 80 Q 57 75, 50 70 Z" fill="white" fillOpacity="0.2" />
          <path d="M75 50 Q 82 43, 90 42 Q 88 52, 85 60 Q 79 54, 75 50 Z" fill="white" fillOpacity="0.15" />
        </svg>

        {/* Bottom Right Floral */}
        <svg className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 opacity-50" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.2" style={{ transform: 'scale(-1, -1)' }}>
          <path d="M10 80 Q 30 40, 60 30 T 100 10" strokeLinecap="round" />
          <path d="M15 90 Q 25 60, 50 50 T 90 35" strokeLinecap="round" />
          <circle cx="25" cy="95" r="3" fill="white" />
          <circle cx="45" cy="75" r="2.5" fill="white" />
          <circle cx="65" cy="60" r="2" fill="white" />
          <path d="M20 100 Q 35 85, 50 80 Q 45 95, 40 110 Q 30 105, 20 100 Z" fill="white" fillOpacity="0.25" />
          <path d="M50 70 Q 60 60, 70 58 Q 68 70, 65 80 Q 57 75, 50 70 Z" fill="white" fillOpacity="0.2" />
          <path d="M75 50 Q 82 43, 90 42 Q 88 52, 85 60 Q 79 54, 75 50 Z" fill="white" fillOpacity="0.15" />
        </svg>
      </div>

      {/* Main Photo Section */}
      <div 
        ref={photoRef}
        className="relative w-full h-[55vh] sm:h-[58vh] md:h-[62vh] lg:h-[65vh]"
      >
        <div className="absolute inset-0">
          <Image
            src="/riri1.jpeg"
            alt="Wedding couple"
            fill
            className="object-cover object-center"
            quality={95}
            priority
          />
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      </div>

      {/* Content Section */}
      <div 
        ref={contentRef}
        className="relative z-20 flex-1 flex flex-col items-center justify-center text-center text-white px-6 sm:px-8 md:px-10 pb-10 sm:pb-12 md:pb-14"
        style={{
          background: 'linear-gradient(to bottom, transparent, black 20%)'
        }}
      >
        {/* Names with Floral Divider */}
        <div className="mb-3 sm:mb-4 md:mb-5">
          <h1
            ref={namesRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-[0.05em] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ikram
          </h1>
          <div className="flex items-center justify-center my-2 sm:my-3">
            <div className="h-px w-12 sm:w-16 bg-white/30" />
            <span className="mx-3 sm:mx-4 text-xl sm:text-2xl md:text-3xl">🌿</span>
            <div className="h-px w-12 sm:w-16 bg-white/30" />
          </div>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-[0.05em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Riri
          </h1>
        </div>

        {/* Date */}
        <p
          ref={dateRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] mb-6 sm:mb-8 md:mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          07.02.26
        </p>

        {/* Divider Line */}
        <div className="w-16 sm:w-20 h-px bg-white/20 mb-6 sm:mb-8" />

        {/* Guest Name */}
        <div ref={guestRef} className="mb-6 sm:mb-8 md:mb-10">
          <p className="text-xs sm:text-sm md:text-base text-white/70 mb-2 sm:mb-3 tracking-[0.15em] uppercase font-light">
            Kepada Yth.
          </p>
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-light tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {guest}
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          ref={buttonRef}
          onClick={handleOpenClick}
          className="px-10 sm:px-12 md:px-14 lg:px-16 py-3 sm:py-3.5 md:py-4 rounded-full bg-white/15 backdrop-blur-md border border-white/40 text-white text-sm sm:text-base md:text-lg font-light tracking-[0.1em] hover:bg-white/25 hover:border-white/60 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
        >
          Open Invitation
        </button>
      </div>
    </section>
  );
}