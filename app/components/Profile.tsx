"use client";

import { JSX, useEffect, useRef } from "react";
import gsap from "gsap";

interface Person {
  name: string;
  image: string;
  parents: string;
}

const people: Person[] = [
  {
    name: "Rizky Santoso",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    parents:
      "Putra pertama dari Bapak H. Ahmad Santoso & Ibu Hj. Siti Nurhaliza",
  },
  {
    name: "Anisa Putri Wardani",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    parents:
      "Putri pertama dari Bapak Dr. H. Bambang Wijaya, M.Si & Ibu Hj. Dewi Kusuma Wardani",
  },
];

export default function Profile(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".profile-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
      })
        .from(
          ".profile-divider",
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".profile-card",
          {
            opacity: 0,
            y: 60,
            duration: 0.9,
            stagger: 0.25,
          },
          "-=0.2"
        )
        .from(
          ".profile-photo",
          {
            scale: 1.15,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
          },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-slate-50 text-center relative overflow-hidden"
    >
      <h2 className="profile-title text-4xl md:text-5xl font-semibold text-slate-900 mb-6">
        Pengantin
      </h2>

      <div className="profile-divider flex items-center justify-center gap-3 mb-20">
        <span className="w-10 h-[1px] bg-slate-300" />
        <span className="text-slate-400 text-sm tracking-widest">✦ ✦ ✦</span>
        <span className="w-10 h-[1px] bg-slate-300" />
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto px-6">
        {people.map((p) => (
          <div
            key={p.name}
            className="profile-card relative bg-white rounded-[2.5rem] border border-slate-200 px-10 pt-16 pb-12 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)]"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2">
              <div className="profile-photo w-44 h-56 rounded-[120px_120px_40px_40px] overflow-hidden border border-slate-300 bg-white shadow-md">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover "
                />
              </div>
            </div>

            <div className="mt-20">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {p.name}
              </h3>

              <p className="text-slate-600 leading-relaxed text-[15px] max-w-sm mx-auto">
                {p.parents}
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <span className="w-12 h-[1px] bg-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
