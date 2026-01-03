"use client";

import { JSX } from "react";

export default function RSVP(): JSX.Element {
  return (
    <section className="py-24 text-center">
      <h2 className="text-4xl mb-8">Ucapan & Konfirmasi</h2>

      <form className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-4">
        <input className="w-full border rounded-xl p-4" placeholder="Nama" />
        <textarea
          className="w-full border rounded-xl p-4"
          placeholder="Ucapan & Doa"
        />
        <select className="w-full border rounded-xl p-4">
          <option>Konfirmasi Kehadiran</option>
          <option>Hadir</option>
          <option>Tidak Hadir</option>
        </select>
        <button className="w-full bg-yellow-400 py-4 rounded-full font-semibold hover:scale-105 transition">
          Kirim
        </button>
      </form>
    </section>
  );
}
