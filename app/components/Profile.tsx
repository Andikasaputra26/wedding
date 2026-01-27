"use client";

import { JSX, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Person {
  name: string;
  image: string;
  parents: string;
  instagram?: string;
}

const people: Person[] = [
  {
    name: "Rizky Santoso",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    parents:
      "Putra pertama dari Bapak H. Ahmad Santoso & Ibu Hj. Siti Nurhaliza",
    instagram: "@rizkysantoso",
  },
  {
    name: "Anisa Putri Wardani",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80",
    parents:
      "Putri pertama dari Bapak Dr. H. Bambang Wijaya, M.Si & Ibu Hj. Dewi Kusuma Wardani",
    instagram: "@anisawardani",
  },
];

export default function Profile(): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each profile section on scroll
      const sections = gsap.utils.toArray<HTMLElement>(".profile-section");

      sections.forEach((section, index) => {
        const card = section.querySelector(".profile-card");
        const photo = section.querySelector(".profile-photo");
        const ornamentTop = section.querySelector(".ornament-top");
        const ornamentBottom = section.querySelector(".ornament-bottom");
        const title = section.querySelector(".profile-title");
        const subtitle = section.querySelector(".profile-subtitle");
        const divider = section.querySelector(".profile-divider");
        const social = section.querySelector(".profile-social");

        // Main entrance timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(card, {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
          .from(
            ornamentTop,
            {
              y: -30,
              opacity: 0,
              scale: 0.8,
              rotation: -45,
              duration: 0.8,
            },
            "-=0.6"
          )
          .from(
            photo,
            {
              scale: 0.9,
              opacity: 0,
              rotateY: index === 0 ? -15 : 15,
              duration: 1,
            },
            "-=0.6"
          )
          .from(
            title,
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
            },
            "-=0.4"
          )
          .from(
            subtitle,
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
            },
            "-=0.6"
          )
          .from(
            divider,
            {
              scaleX: 0,
              opacity: 0,
              duration: 0.6,
            },
            "-=0.4"
          )
          .from(
            social,
            {
              y: 10,
              opacity: 0,
              duration: 0.6,
            },
            "-=0.3"
          )
          .from(
            ornamentBottom,
            {
              y: 30,
              opacity: 0,
              scale: 0.8,
              rotation: 45,
              duration: 0.8,
            },
            "-=0.6"
          );

        // Continuous floating animations
        gsap.to(photo, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(ornamentTop, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: "none",
        });

        gsap.to(ornamentBottom, {
          rotation: -360,
          duration: 50,
          repeat: -1,
          ease: "none",
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full">
      {people.map((p, idx) => (
        <section
          key={p.name}
          className="profile-section relative min-h-screen w-full flex items-center justify-center overflow-hidden py-16 sm:py-20"
        >
          {/* Enhanced Background */}
          <div className="absolute inset-0">
            <img
              src={p.image}
              alt={p.name}
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-slate-950/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            
            {/* Animated gradient orb */}
            <div 
              className={`absolute ${idx === 0 ? "top-1/4 left-1/4" : "bottom-1/4 right-1/4"} w-64 h-64 sm:w-96 sm:h-96 ${idx === 0 ? "bg-amber-500/8" : "bg-rose-500/8"} rounded-full blur-[120px] animate-pulse`}
              style={{ animationDelay: `${idx * 1.5}s` }}
            />
            
            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Profile Card with enhanced styling */}
          <div
            className="profile-card relative z-10 w-[90%] max-w-md sm:max-w-lg mx-4"
          >
            {/* Top ornament */}
            <div className="ornament-top absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 opacity-70">
              <div className={`w-full h-full border-2 ${idx === 0 ? "border-amber-300/60" : "border-rose-300/60"} rounded-full`} />
              <div className={`absolute inset-2 border-2 ${idx === 0 ? "border-amber-400/40" : "border-rose-400/40"} rounded-full`} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 ${idx === 0 ? "bg-amber-300/80" : "bg-rose-300/80"} rounded-full shadow-lg`} />
            </div>

            {/* Bottom ornament */}
            <div className="ornament-bottom absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 opacity-70">
              <div className={`w-full h-full border-2 ${idx === 0 ? "border-amber-300/60" : "border-rose-300/60"} rounded-full`} />
              <div className={`absolute inset-2 border-2 ${idx === 0 ? "border-amber-400/40" : "border-rose-400/40"} rounded-full`} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 ${idx === 0 ? "bg-amber-300/80" : "bg-rose-300/80"} rounded-full shadow-lg`} />
            </div>

            {/* Card content */}
            <div className="relative bg-white/20 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 md:p-12 text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] border border-white/30">
              {/* Corner ornaments */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-white/40 rounded-tl-xl" />
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-white/40 rounded-tr-xl" />
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-white/40 rounded-bl-xl" />
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-white/40 rounded-br-xl" />

              {/* Photo frame with enhanced styling */}
              <div className="profile-photo relative mx-auto mb-8 sm:mb-10 w-40 h-52 sm:w-48 sm:h-60 md:w-56 md:h-72">
                {/* Glow effect */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${idx === 0 ? "from-amber-300/30 via-amber-200/20 to-amber-300/30" : "from-rose-300/30 via-rose-200/20 to-rose-300/30"} rounded-[140px_140px_50px_50px] sm:rounded-[160px_160px_60px_60px] blur-xl`} />
                
                {/* Photo container */}
                <div className={`relative w-full h-full rounded-[130px_130px_45px_45px] sm:rounded-[150px_150px_55px_55px] overflow-hidden border-[3px] ${idx === 0 ? "border-amber-300/80" : "border-rose-300/80"} shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Photo overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
                </div>

                {/* Decorative corners */}
                <div className={`absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 ${idx === 0 ? "border-amber-300/60" : "border-rose-300/60"} rounded-tl-2xl`} />
                <div className={`absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 ${idx === 0 ? "border-amber-300/60" : "border-rose-300/60"} rounded-tr-2xl`} />
                <div className={`absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 ${idx === 0 ? "border-amber-300/60" : "border-rose-300/60"} rounded-bl-2xl`} />
                <div className={`absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 ${idx === 0 ? "border-amber-300/60" : "border-rose-300/60"} rounded-br-2xl`} />
              </div>

              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className={`h-[1.5px] w-10 sm:w-12 bg-gradient-to-r from-transparent ${idx === 0 ? "via-amber-200/70 to-amber-300/70" : "via-rose-200/70 to-rose-300/70"} rounded-full`} />
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${idx === 0 ? "bg-amber-200/80" : "bg-rose-200/80"} shadow-lg`} />
                <div className={`h-[1.5px] w-10 sm:w-12 bg-gradient-to-l from-transparent ${idx === 0 ? "via-amber-200/70 to-amber-300/70" : "via-rose-200/70 to-rose-300/70"} rounded-full`} />
              </div>

              {/* Name */}
              <h3 
                className="profile-title text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 tracking-wide leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span className={`bg-gradient-to-br ${idx === 0 ? "from-amber-50 via-white to-amber-50" : "from-rose-50 via-white to-rose-50"} bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]`}>
                  {p.name}
                </span>
              </h3>

              {/* Parents info */}
              <p 
                className="profile-subtitle text-white/95 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4 drop-shadow-lg"
                style={{ fontFamily: "'Crimson Text', serif", fontStyle: "italic" }}
              >
                {p.parents}
              </p>

              {/* Divider */}
              <div className="profile-divider flex items-center justify-center gap-2 sm:gap-3 my-6 sm:my-8">
                <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-white/50 to-white/60 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-lg" />
                <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-white/50 to-white/60 rounded-full" />
              </div>

              {/* Instagram link */}
              {p.instagram && (
                <a
                  href={`https://instagram.com/${p.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-social inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/90 hover:bg-white border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 group-hover:text-slate-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-slate-900 transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {p.instagram}
                  </span>
                </a>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}