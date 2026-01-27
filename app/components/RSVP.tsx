"use client";

import { JSX, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addDoc, collection, query, orderBy, limit, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

gsap.registerPlugin(ScrollTrigger);

interface Comment {
  createdAt: any;
  id: string;
  name: string;
  message: string;
  attendance: string;
  date: string;
}

// Jotai atoms
const nameAtom = atomWithReset("");
const messageAtom = atomWithReset("");
const attendanceAtom = atomWithReset("");
const commentsAtom = atomWithReset<Comment[]>([]);
const loadingCommentsAtom = atomWithReset(true);
const isSubmittingAtom = atomWithReset(false);
const showSuccessAtom = atomWithReset(false);

export default function RSVP(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useAtom(nameAtom);
  const [message, setMessage] = useAtom(messageAtom);
  const [attendance, setAttendance] = useAtom(attendanceAtom);
  const [comments, setComments] = useAtom(commentsAtom);
  const [loadingComments, setLoadingComments] = useAtom(loadingCommentsAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);
  const [showSuccess, setShowSuccess] = useAtom(showSuccessAtom);

  const resetName = useResetAtom(nameAtom);
  const resetMessage = useResetAtom(messageAtom);
  const resetAttendance = useResetAtom(attendanceAtom);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" } });
      tl.from(titleRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out" })
        .from(".ornament-line", { scaleX: 0, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .from(formRef.current, { y: 40, opacity: 0, scale: 0.95, duration: 1 }, "-=0.4")
        .from(".form-field", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.6");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "join_message"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData: Comment[] = [];
      snapshot.forEach((doc) => commentsData.push({ id: doc.id, ...doc.data() } as Comment));
      setComments(commentsData);
      setLoadingComments(false);
    });
    return () => unsubscribe();
  }, [setComments, setLoadingComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "join_message"), {
        name,
        message,
        attendance,
        createdAt: serverTimestamp(),
      });
      setShowSuccess(true);
      resetName();
      resetMessage();
      resetAttendance();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBadge = (att: string) => {
    if (att === "hadir") return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 shadow-sm">✓ Hadir</span>;
    if (att === "tidak-hadir") return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 shadow-sm">✗ Tidak Hadir</span>;
    if (att === "masih-ragu") return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-sm">? Masih Ragu</span>;
    return null;
  };

  return (
    <section ref={sectionRef} className="relative py-20 px-4 overflow-hidden" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="ornament-line h-[2px] w-16 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-500 rounded-full" />
          <div className="ornament-line w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xl shadow-amber-500/50" />
          <div className="ornament-line h-[2px] w-16 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-500 rounded-full" />
        </div>

        <h2 ref={titleRef} className="text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="bg-gradient-to-br from-white via-amber-50 to-amber-100 bg-clip-text text-transparent">Ucapan & Konfirmasi</span>
        </h2>
        <p className="text-sm text-white/60 mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Berikan ucapan terbaik untuk kami dan konfirmasi kehadiran Anda</p>

        {/* Form */}
        <div className="relative max-w-2xl mx-auto mb-20">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 via-rose-400/20 to-amber-400/20 rounded-3xl blur-2xl" />
          <form ref={formRef} onSubmit={handleSubmit} className="relative bg-white rounded-3xl p-10 shadow-2xl border border-white/80">
            <div className="text-center mb-8">
              <div className="w-18 h-18 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Buku Tamu Digital</h3>
              <p className="text-sm text-slate-500" style={{ fontFamily: "'Crimson Text', serif" }}>Silakan isi form di bawah ini</p>
            </div>

            <div className="space-y-5">
              <div className="form-field">
                <label className="block text-left text-sm font-semibold text-slate-700 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <div className="flex items-center gap-2"><div className="w-1 h-4 bg-amber-500 rounded-full" />Nama Lengkap</div>
                </label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3.5 text-sm bg-white transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/10 text-slate-800 placeholder:text-slate-400" placeholder="Masukkan nama lengkap" style={{ fontFamily: "'Crimson Text', serif" }} />
              </div>

              <div className="form-field">
                <label className="block text-left text-sm font-semibold text-slate-700 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <div className="flex items-center gap-2"><div className="w-1 h-4 bg-amber-500 rounded-full" />Ucapan & Doa</div>
                </label>
                <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3.5 text-sm bg-white transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/10 resize-none text-slate-800 placeholder:text-slate-400" placeholder="Tulis ucapan dan doa..." style={{ fontFamily: "'Crimson Text', serif" }} />
              </div>

              <div className="form-field">
                <label className="block text-left text-sm font-semibold text-slate-700 mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <div className="flex items-center gap-2"><div className="w-1 h-4 bg-amber-500 rounded-full" />Konfirmasi Kehadiran</div>
                </label>
                <div className="relative">
                  <select required value={attendance} onChange={(e) => setAttendance(e.target.value)} className="w-full appearance-none border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3.5 pr-10 text-sm bg-white transition-all focus:outline-none focus:ring-4 focus:ring-amber-400/10 text-slate-800 cursor-pointer" style={{ fontFamily: "'Crimson Text', serif" }}>
                    <option value="">Pilih konfirmasi</option>
                    <option value="hadir">✓ Hadir</option>
                    <option value="tidak-hadir">✗ Tidak Hadir</option>
                    <option value="masih-ragu">? Masih Ragu</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <div className="form-field pt-2">
                <button type="submit" disabled={isSubmitting} className="group w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
                </button>
              </div>
            </div>

            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/98 rounded-3xl z-10">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-bounce">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-green-700 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Terima Kasih!</h3>
                  <p className="text-sm text-slate-600" style={{ fontFamily: "'Crimson Text', serif" }}>Ucapan Anda telah terkirim</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Comments */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-white/50 rounded-full" />
            <h3 className="text-4xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Ucapan Tamu</h3>
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-white/50 rounded-full" />
          </div>

          {loadingComments ? (
            <div className="text-center py-12">
              <svg className="animate-spin w-10 h-10 mx-auto text-amber-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
              <p className="mt-4 text-sm text-white/60">Memuat...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12"><p className="text-white/60">Belum ada ucapan</p></div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {comments.map((c, i) => (
                <div key={c.id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all" style={{ animation: `fadeIn 0.6s ${i * 0.1}s both` }}>
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{c.name}</h4>
                      <p className="text-xs text-white/50 mt-1">
                      {c.createdAt?.toDate().toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }) || "Baru saja"}
                    </p>
                    </div>
                    {getBadge(c.attendance)}
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed" style={{ fontFamily: "'Crimson Text', serif" }}>{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}