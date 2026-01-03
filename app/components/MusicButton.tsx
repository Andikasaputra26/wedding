"use client";

import { useRef, useState } from "react";
import React, { JSX } from "react";

export default function MusicButton(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) audioRef.current.pause();
    else audioRef.current.play();

    setPlaying(!playing);
  };

  return (
    <>
      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-yellow-400 shadow-xl flex items-center justify-center text-xl transition ${
          playing ? "animate-spin" : ""
        }`}
      >
        🎵
      </button>
      <audio ref={audioRef} loop src="/music.mp3" />
    </>
  );
}
