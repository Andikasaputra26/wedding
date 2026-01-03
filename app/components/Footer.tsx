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

      <p className="italic opacity-70">
        Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
      </p>

      <p className="mt-6 font-semibold">Keluarga Besar Azhari & Nisa</p>
    </footer>
  );
}
