"use client";

import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      ([entry]) => entry.isIntersecting && setIsInView(true),
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

  // Lock scroll saat popup terbuka
  useEffect(() => {
    document.body.style.overflow = activeImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            radial-gradient(circle at 75% 25%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(244, 63, 94, 0.3) 0%, transparent 50%)
          `,
        }}
      />

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
            <div
              key={i}
              onClick={() => setActiveImage(img.url)}
              className={`gallery-item group relative cursor-pointer ${img.gridClass} overflow-hidden rounded-xl bg-slate-800/50 hover:shadow-2xl transition-shadow duration-300`}
            >
              <Image
                src={img.url}
                alt={`Galeri ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading={i < 2 ? "eager" : "lazy"}
                quality={85}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all duration-300 group"
            aria-label="Close popup"
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
          <div
            className="relative max-w-5xl max-h-[90vh] w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={activeImage}
                alt="Gambar diperbesar"
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                quality={100}
                priority
              />
            </div>

            {/* Image Caption/Decoration */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <p className="text-white/90 text-center italic font-serif text-sm">
                Kenangan indah yang selalu terpatri di hati
              </p>
            </div>
          </div>

          {/* Navigation hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
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
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}