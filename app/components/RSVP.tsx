"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

gsap.registerPlugin(ScrollTrigger);

export default function RSVP(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // state field
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(".ornament-line", {
          scaleX: 0,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        }, "-=0.6")
        .from(formRef.current, {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
        }, "-=0.4")
        .from(".form-field", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "join_message"), {
        name,
        message,
        attendance,
        date: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });

      setShowSuccess(true);
      setName("");
      setMessage("");
      setAttendance("");

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-rose-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Top ornamental line */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="ornament-line h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-500/50 rounded-full" />
          <div className="ornament-line w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/70 shadow-lg shadow-amber-500/30" />
          <div className="ornament-line w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 shadow-lg shadow-amber-500/40" />
          <div className="ornament-line w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/70 shadow-lg shadow-amber-500/30" />
          <div className="ornament-line h-[2px] w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-500/50 rounded-full" />
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="bg-gradient-to-br from-white via-amber-50 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
            Ucapan & Konfirmasi
          </span>
        </h2>

        <p
          className="text-sm sm:text-base md:text-lg text-white/60 mb-12 sm:mb-16 tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Berikan ucapan terbaik untuk kami dan konfirmasi kehadiran Anda
        </p>

        {/* Form Container */}
        <div className="relative max-w-2xl mx-auto">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-amber-400/20 rounded-[2.5rem] sm:rounded-[3rem] blur-2xl" />

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 md:p-12 lg:p-14 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-amber-100/50 space-y-6 sm:space-y-8"
          >
            {/* Corner ornaments */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-amber-200/40 rounded-tl-2xl" />
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-amber-200/40 rounded-tr-2xl" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-amber-200/40 rounded-bl-2xl" />
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-amber-200/40 rounded-br-2xl" />

            {/* Name Input */}
            <div className="form-field relative group">
              <label
                className="block text-left text-sm sm:text-base font-semibold text-amber-900/80 mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Nama Lengkap
                </div>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-amber-200/60 focus:border-amber-400 rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:shadow-lg text-slate-900 placeholder:text-slate-400"
                placeholder="Masukkan nama lengkap Anda"
                style={{ fontFamily: "'Crimson Text', serif" }}
              />
            </div>

            {/* Message Textarea */}
            <div className="form-field relative group">
              <label
                className="block text-left text-sm sm:text-base font-semibold text-amber-900/80 mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  Ucapan & Doa
                </div>
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-2 border-amber-200/60 focus:border-amber-400 rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:shadow-lg resize-none text-slate-900 placeholder:text-slate-400"
                placeholder="Tulis ucapan dan doa terbaik untuk kami..."
                style={{ fontFamily: "'Crimson Text', serif" }}
              />
            </div>

            {/* Attendance Select */}
            <div className="form-field relative group">
              <label
                className="block text-left text-sm sm:text-base font-semibold text-amber-900/80 mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Konfirmasi Kehadiran
                </div>
              </label>
              <div className="relative">
                <select
                  required
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="w-full appearance-none border-2 border-amber-200/60 focus:border-amber-400 rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-3 sm:py-4 pr-12 text-sm sm:text-base bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:shadow-lg text-slate-900 cursor-pointer"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  <option value="">Pilih konfirmasi kehadiran</option>
                  <option value="hadir">✓ Hadir</option>
                  <option value="tidak-hadir">✗ Tidak Hadir</option>
                  <option value="masih-ragu">? Masih Ragu</option>
                </select>
                <div className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-6 sm:my-8">
              <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-r from-transparent via-amber-300/50 to-amber-400/50 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
              <div className="h-[1px] w-16 sm:w-20 bg-gradient-to-l from-transparent via-amber-300/50 to-amber-400/50 rounded-full" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="form-field group relative w-full py-4 sm:py-5 rounded-full overflow-hidden font-bold text-base sm:text-lg tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {/* Button gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 transition-transform duration-500 group-hover:scale-110" />
              
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              {/* Button text */}
              <span className="relative text-slate-900 flex items-center justify-center gap-2 sm:gap-3">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim Ucapan
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>

            {/* Success Message */}
            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3rem] animate-in fade-in duration-300">
                <div className="text-center px-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 
                    className="text-2xl sm:text-3xl font-bold text-green-700 mb-2 sm:mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Terima Kasih!
                  </h3>
                  <p 
                    className="text-sm sm:text-base text-slate-600"
                    style={{ fontFamily: "'Crimson Text', serif" }}
                  >
                    Ucapan Anda telah terkirim
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Bottom ornamental line */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-12 sm:mt-16">
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