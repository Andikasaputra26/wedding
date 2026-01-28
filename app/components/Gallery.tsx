"use client";

import Image from "next/image";
import { JSX, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { url: "/riri1.jpeg", gridClass: "col-span-1 row-span-2 md:col-start-1 md:row-start-1" },
  { url: "/riri2.jpeg", gridClass: "col-span-1 row-span-1 md:col-span-2 md:col-start-2 md:row-start-1" },
  { url: "/riri3.jpeg", gridClass: "col-span-1 row-span-1 md:col-start-2 md:row-start-2" },
  { url: "/riri4.jpeg", gridClass: "col-span-1 row-span-2 md:col-start-3 md:row-start-2" },
  { url: "/riri5.jpeg", gridClass: "col-span-1 row-span-1 md:col-start-1 md:row-start-3" },
];

export default function Gallery(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 px-4 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Simple background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-rose-500/30 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-lg" />
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="bg-gradient-to-br from-white to-amber-100 bg-clip-text text-transparent">
            Galeri Kenangan
          </span>
        </h2>

        <p className="text-center text-sm text-white/60 mb-12 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Momen Indah Perjalanan Cinta Kami
        </p>

        {/* Gallery Grid - Simplified */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-3 sm:gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`gallery-item group relative ${img.gridClass} overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-800`}
            >
              <Image
                src={img.url}
                alt={`Gallery ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading={i < 2 ? "eager" : "lazy"}
              />

              {/* Simple overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white rounded-full p-3 shadow-xl">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-12">
          <p className="text-sm text-white/70 italic" style={{ fontFamily: "'Crimson Text', serif" }}>
            "Setiap momen adalah kenangan yang tak terlupakan"
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-rose-500 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-rose-500 shadow-lg" />
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-rose-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}