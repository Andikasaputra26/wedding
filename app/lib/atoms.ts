import { atom } from "jotai";
import type { Comment } from "../components/RSVP";
// Form state
export const nameAtom = atom<string>("");
export const messageAtom = atom<string>("");
export const attendanceAtom = atom<string>("Konfirmasi Kehadiran");

// Comments list
export const commentsAtom = atom<Comment[]>([]);

// Attendance counts
export const attendanceCountsAtom = atom({
  hadir: 0,
  tidakHadir: 0,
  ragu: 0,
});
