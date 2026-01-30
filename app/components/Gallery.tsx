"use client";

import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const images = [
  { url: "/riri1.jpeg", gridClass: "col-span-1 row-span-2 md:col-start-1 md:row-start-1" },
  { url: "/riri7.jpeg", gridClass: "col-span-1 row-span-1 md:col-span-2 md:col-start-2 md:row-start-1" },
  { url: "/riri3.jpeg", gridClass: "col-span-1 row-span-1 md:col-start-2 md:row-start-2" },
  { url: "/riri4.jpeg", gridClass: "col-span-1 row-span-2 md:col-start-3 md:row-start-2" },
  { url: "/riri5.jpeg", gridClass: "col-span-1 row-span-1 md:col-start-1 md:row-start-3" },
];

export default function Gallery(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
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

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_75%_25%,rgba(245,158,11,0.3)_0%,transparent_50%),radial-gradient(circle_at_25%_75%,rgba(244,63,94,0.3)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-center font-serif">
          <span className="bg-gradient-to-br from-white to-amber-100 bg-clip-text text-transparent">
            Galeri Kenangan
          </span>
        </h2>

        <p className="text-center text-sm text-white/60 mb-12 italic font-serif">
          Momen Indah Perjalanan Cinta Kami
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-3 sm:gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img.url)}
              className={`gallery-item group relative overflow-hidden rounded-xl bg-slate-800/50 hover:shadow-2xl transition-shadow duration-300 ${img.gridClass}`}
              aria-label={`Lihat gambar ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={`Galeri ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading={i < 2 ? "eager" : "lazy"}
                quality={75}
              />

              {/* Overlay dengan icon yang lebih menarik */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {/* Icon Container dengan multiple effects */}
                <div className="relative">
                  {/* Outer ring pulse */}
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                  
                  {/* Main icon button */}
                  <div className="relative bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-4 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-amber-500/50">
                    {/* Eye icon - lebih elegan */}
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Sparkle decorations */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 group-hover:animate-pulse" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 group-hover:animate-pulse" />
                </div>

                {/* View text */}
                <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <p className="text-white text-sm font-medium tracking-wider drop-shadow-lg">
                    Lihat Foto
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-white/70 italic font-serif">
            "Setiap momen adalah kenangan yang tak terlupakan"
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-rose-500 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-rose-500 rounded-full" />
        </div>
      </div>

      {/* Image Popup Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[60] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 group"
            aria-label="Tutup popup"
          >
            <svg
              className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
            <div
              className="relative w-full max-w-6xl animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Actual Image Display */}
              <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                <Image
                  src={activeImage}
                  alt="Gambar diperbesar"
                  fill
                  className="object-contain rounded-lg shadow-2xl"
                  quality={75}
                  priority
                  sizes="100vw"
                />
              </div>

              {/* Image Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 rounded-b-lg">
                <p className="text-white/90 text-center italic font-serif text-sm sm:text-base">
                  Kenangan indah yang selalu terpatri di hati
                </p>
              </div>
            </div>
          </div>

          {/* Navigation hint */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs sm:text-sm text-center px-4">
            Klik di luar gambar untuk menutup
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </section>
  );
}