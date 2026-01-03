import { JSX } from "react";

export default function Location(): JSX.Element {
  return (
    <section className="py-24 bg-slate-50 text-center">
      <h2 className="text-4xl mb-8">Lokasi Acara</h2>
      <p className="mb-8 opacity-70">
        Gedung Grand Ballroom Plaza
        <br />
        Jakarta Pusat
      </p>

      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-gray-300">
        <iframe
          className="w-full h-[450px]"
          loading="lazy"
          src="https://www.google.com/maps?q=Monas&output=embed"
        />
      </div>
    </section>
  );
}
