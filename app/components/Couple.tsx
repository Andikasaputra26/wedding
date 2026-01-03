"use client";

import SectionWrapper from "./SectionWrapper";

export default function Couple() {
  return (
    <SectionWrapper>
      <section className="py-28 bg-slate-100">
        <div className="animate-item max-w-4xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200"
              alt="Couple"
              className="animate-item w-full h-[460px] object-cover"
            />
            <div className="animate-item absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent p-10 text-center text-slate-100">
              <h2 className="text-4xl md:text-5xl font-semibold mb-3">
                Risky Santoso & Nisa Wardani
              </h2>
              <p className="opacity-80">
                Perjalanan cinta kami dimulai dari sini
              </p>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
