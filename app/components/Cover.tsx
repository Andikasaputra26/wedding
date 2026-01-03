"use client";

import { useSearchParams } from "next/navigation";
import React, { JSX } from "react";

interface CoverProps {
  onOpen: () => void;
}

export default function Cover({ onOpen }: CoverProps): JSX.Element {
  const params = useSearchParams();
  const guest = params.get("to") || params.get("name") || "Bapak/Ibu/Saudara/i";

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(135deg,rgba(15,23,42,0.85),rgba(2,6,23,0.9)),url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200')] bg-cover bg-center">
      <div className="text-center text-slate-100 backdrop-blur-xl bg-slate-900/40 border border-slate-400/30 rounded-[2.5rem] p-10 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.8)] max-w-md">
        <p className="tracking-[4px] text-xs uppercase opacity-70">
          The Wedding Of
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold my-5 tracking-wide">
          Azhari & Nisa
        </h1>

        {/* Photo */}
        <div className="mx-auto my-8 w-64 h-80 rounded-[150px_150px_40px_40px] overflow-hidden border border-slate-400/40 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600"
            className="w-full h-full object-cover"
            alt="Couple"
          />
        </div>

        <p className="text-sm opacity-80">Kepada Yth</p>
        <h2 className="text-2xl font-medium my-2 tracking-wide text-slate-200">
          {guest}
        </h2>
        <p className="text-sm opacity-80">Di Tempat</p>

        <button
          onClick={onOpen}
          className="mt-8 px-12 py-4 rounded-full bg-slate-100 text-slate-900 font-medium tracking-wide shadow-md hover:bg-white hover:scale-105 transition"
        >
          Buka Undangan
        </button>
      </div>
    </section>
  );
}
