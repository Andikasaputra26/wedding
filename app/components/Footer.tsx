import { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-slate-950 text-slate-100 text-center py-20">
      <h3 className="text-3xl mb-6">Terima Kasih</h3>

      <p className="max-w-xl mx-auto leading-relaxed opacity-80">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
      </p>

      <div className="w-24 h-[1px] bg-white/40 mx-auto my-8" />

      <p className="italic opacity-70 mb-6">
        Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
      </p>

      <p className="mt-6 font-semibold">
        Keluarga Besar Risky Santoso & Anisa Putri Wardani
      </p>
      <a
        href="https://instagram.com/andiiikasptra"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 opacity-80 hover:opacity-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-.75a.75.75 0 100 1.5.75.75 0 000-1.5z" />
        </svg>
        <span className="text-sm">@andiiikasptra</span>
      </a>
    </footer>
  );
}
