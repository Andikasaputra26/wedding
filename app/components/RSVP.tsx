"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  nameAtom,
  messageAtom,
  attendanceAtom,
  commentsAtom,
  attendanceCountsAtom,
} from "../lib/atoms";

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion } from "framer-motion";

export type Comment = {
  id?: string;
  name: string;
  message: string;
  attendance: string;
  date: string;
};

export default function Join() {
  const [name, setName] = useAtom(nameAtom);
  const [message, setMessage] = useAtom(messageAtom);
  const [attendance, setAttendance] = useAtom(attendanceAtom);
  const [comments, setComments] = useAtom(commentsAtom);
  const [attendanceCounts, setAttendanceCounts] = useAtom(attendanceCountsAtom);

  // Ambil data dari Firestore
  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, "join_message"),
        orderBy("date", "desc")
      );

      const snap = await getDocs(q);
      const parsed: Comment[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Comment),
      }));

      setComments(parsed);

      const counts = { hadir: 0, tidakHadir: 0, ragu: 0 };
      parsed.forEach((c) => {
        if (c.attendance === "Hadir") counts.hadir++;
        if (c.attendance === "Tidak Hadir") counts.tidakHadir++;
        if (c.attendance === "Masih Ragu") counts.ragu++;
      });
      setAttendanceCounts(counts);
    };

    fetchComments();
  }, [setComments, setAttendanceCounts]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message || attendance === "Konfirmasi Kehadiran") {
      alert("Semua kolom harus diisi!");
      return;
    }

    const newComment: Comment = {
      name,
      message,
      attendance,
      date: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(db, "join_message"),
      newComment
    );

    const saved: Comment = { ...newComment, id: docRef.id };

    setComments([saved, ...comments]);

    const updatedCounts = { ...attendanceCounts };
    if (attendance === "Hadir") updatedCounts.hadir++;
    if (attendance === "Tidak Hadir") updatedCounts.tidakHadir++;
    if (attendance === "Masih Ragu") updatedCounts.ragu++;
    setAttendanceCounts(updatedCounts);

    setName("");
    setMessage("");
    setAttendance("Konfirmasi Kehadiran");
  };

  return (
  <section className="relative py-28 px-4 bg-gradient-to-b from-slate-50 via-gray-50 to-white overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gray-300 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-slate-300 blur-[120px]"
      />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-3">
          Ucapan & Konfirmasi
        </h2>
        <p className="text-sm tracking-[0.3em] uppercase text-gray-500">
          Reservasi Kehadiran
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2"
        >
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-200/50">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Hadir", value: attendanceCounts.hadir },
                { label: "Tidak Hadir", value: attendanceCounts.tidakHadir },
                { label: "Ragu", value: attendanceCounts.ragu },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-500 shadow-lg flex items-center justify-center text-white text-2xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none bg-white/50"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ucapan & Doa
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none resize-none bg-white/50"
                  placeholder="Tuliskan ucapan dan doa..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Kehadiran
                </label>
                <select
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none bg-white/50"
                >
                  <option>Konfirmasi Kehadiran</option>
                  <option>Hadir</option>
                  <option>Tidak Hadir</option>
                  <option>Masih Ragu</option>
                </select>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold shadow-lg"
              >
                Kirim Ucapan
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Comments */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-2xl font-serif text-slate-900 mb-6">
            Ucapan Tamu
          </h3>

          <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-slate-200/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {c.attendance}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {c.message}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

}
