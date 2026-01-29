"use client";

import { useEffect, useRef, useState } from "react";
import React, { JSX } from "react";

interface MusicButtonProps {
  autoPlay?: boolean;
}

export default function MusicButton({ autoPlay }: MusicButtonProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (autoPlay && audioRef.current && !playing) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay bisa diblokir browser, user tetap bisa klik manual
        });
    }
  }, [autoPlay, playing]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-yellow-400 shadow-xl flex items-center justify-center text-xl transition ${
          playing ? "animate-spin" : ""
        }`}
      >
        🎵
      </button>
      <audio ref={audioRef} loop src="/musik.mp3" />
    </>
  );
}
