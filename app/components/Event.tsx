"use client";

import { useEffect, useState } from "react";
import React, { JSX } from "react";

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

export default function Event(): JSX.Element {
  const target = new Date("2026-06-20T08:00:00").getTime();
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const i = setInterval(() => {
      const diff = target - Date.now();
      if (diff < 0) return;

      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(i);
  }, [target]);

  return (
    <section className="py-24 bg-slate-950 text-slate-100 text-center">
      <h2 className="text-4xl mb-10">Detail Acara</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-xl mx-auto mb-16">
        {Object.entries({
          Hari: t.d,
          Jam: t.h,
          Menit: t.m,
          Detik: t.s,
        }).map(([label, value]) => (
          <div
            key={label}
            className="bg-white text-slate-900 rounded-2xl p-6 border border-slate-200"
          >
            <div className="text-4xl font-bold">
              {String(value).padStart(2, "0")}
            </div>
            <div className="uppercase text-sm opacity-70">{label}</div>
          </div>
        ))}
      </div>

      <p className="opacity-80">
        Sabtu, 20 Juni 2026
        <br />
        Pukul 08.00 – 15.00 WIB
      </p>
    </section>
  );
}
