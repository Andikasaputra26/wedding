"use client";

import { JSX, useEffect, useRef } from "react";

interface GalleryImage {
  url: string;
  size: "tall" | "wide" | "square";
  position: string;
}

const images: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    size: "tall",
    position: "row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    size: "square",
    position: "",
  },
  {
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    size: "wide",
    position: "col-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    size: "square",
    position: "",
  },
  {
    url: "https://images.unsplash.com/photo-1520975922284-7b9587dd0fda?auto=format&fit=crop&w=800&q=80",
    size: "tall",
    position: "row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
    size: "square",
    position: "",
  },
];

export default function Gallery(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top ornamental line */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-500/50 rounded-full" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/70 shadow-lg shadow-amber-500/30" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 shadow-lg shadow-amber-500/40" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/70 shadow-lg shadow-amber-500/30" />
          <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-500/50 rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-center tracking-wide">
          <span className="bg-gradient-to-br from-white via-amber-50 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
            Galeri Kenangan
          </span>
        </h2>

        <p className="text-center text-sm sm:text-base md:text-lg text-white/60 mb-12 sm:mb-16 md:mb-20 tracking-wide italic">
          Momen Indah Perjalanan Cinta Kami
        </p>

        {/* Masonry Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[280px] gap-3 sm:gap-4 md:gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              className={`group relative ${img.position} overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-200`}
            >
              {/* Image */}
              <img
                src={img.url}
                alt={`Gallery ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/800x600/f59e0b/ffffff?text=Photo+${i + 1}`;
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Magnify icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 sm:p-4 shadow-xl">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-amber-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <p className="text-sm sm:text-base md:text-lg text-white/80 italic">
            "Setiap momen adalah kenangan yang tak terlupakan"
          </p>
        </div>

        {/* Bottom ornamental line */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
          <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-rose-400/50 to-rose-500/50 rounded-full" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400/70 shadow-lg shadow-rose-500/30" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 shadow-lg shadow-rose-500/40" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400/70 shadow-lg shadow-rose-500/30" />
          <div className="h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-rose-400/50 to-rose-500/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}