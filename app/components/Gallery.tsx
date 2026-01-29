"use client";

import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
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
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Intersection Observer untuk lazy load animasi
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Simplified background - menggunakan CSS biasa tanpa div tambahan */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            radial-gradient(circle at 75% 25%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(244, 63, 94, 0.3) 0%, transparent 50%)
          `
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-center font-serif">
          <span className="bg-gradient-to-br from-white to-amber-100 bg-clip-text text-transparent">
            Galeri Kenangan
          </span>
        </h2>

        <p className="text-center text-sm text-white/60 mb-12 italic font-serif">
          Momen Indah Perjalanan Cinta Kami
        </p>

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-3 sm:gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`gallery-item group relative ${img.gridClass} overflow-hidden rounded-xl bg-slate-800/50 hover:shadow-2xl transition-shadow duration-300`}
            >
              <Image
                src={img.url}
                alt={`Galeri kenangan ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading={i < 2 ? "eager" : "lazy"}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA3gAA//9k="
              />

              {/* Hover overlay - disederhanakan */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
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
          <p className="text-sm text-white/70 italic font-serif">
            "Setiap momen adalah kenangan yang tak terlupakan"
          </p>
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-rose-500 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-rose-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}