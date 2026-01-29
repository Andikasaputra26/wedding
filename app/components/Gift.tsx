"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Gift() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const number = "089510403610";

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        cardRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );
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
          src="/riri4.jpeg"
          alt="Gift Background"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="bg-gradient-to-br from-white via-amber-50 to-white bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
            Wedding Gift
          </span>
        </h2>

        <p
          className="text-sm sm:text-base md:text-lg text-white/70 mb-10 sm:mb-14"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Doa restu Anda adalah hadiah terindah bagi kami.  
          Namun jika ingin berbagi kebahagiaan, dapat melalui:
        </p>

        {/* Gift Card */}
        <div ref={cardRef} className="relative max-w-md sm:max-w-lg mx-auto">
          <div className="absolute -inset-2 bg-gradient-to-br from-amber-400/20 via-rose-400/20 to-amber-400/20 rounded-[2rem] blur-2xl" />

          <div className="relative bg-white/15 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/30 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <p
              className="text-base sm:text-lg md:text-xl mb-6 text-white/90"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Wallet Dana
            </p>

            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-widest mb-4">
              {number}
            </div>

            <p className="text-sm sm:text-base text-white/70 mb-6">
              a.n. Riri
            </p>

            <button
              onClick={async () => {
                await navigator.clipboard.writeText(number);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full py-3 sm:py-4 rounded-full bg-white text-slate-900 font-semibold hover:bg-amber-50 transition-all duration-300"
            >
              {copied ? "Nomor Tersalin ✓" : "Salin Nomor Rekening"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
