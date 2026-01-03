"use client";

import { useEffect } from "react";
import { JSX } from "react";

const petals = ["🌸", "🌺", "🌼", "🌷", "💐", "🌹"];

export default function FloatingFlowers(): JSX.Element {
  useEffect(() => {
    const container = document.getElementById("flower-container");
    if (!container) return;

    const createPetal = () => {
      const petal = document.createElement("span");

      petal.innerText = petals[Math.floor(Math.random() * petals.length)];
      petal.className = "petal";

      petal.style.left = Math.random() * 100 + "vw";

      const size = 18 + Math.random() * 26;
      petal.style.fontSize = size + "px";

      const duration = 10 + Math.random() * 10;
      petal.style.animationDuration = duration + "s";

      petal.style.setProperty("--drift", `${Math.random() * 100 - 50}px`);

      container.appendChild(petal);

      setTimeout(() => petal.remove(), duration * 1000);
    };

    for (let i = 0; i < 6; i++) {
      setTimeout(createPetal, i * 300);
    }

    const interval = setInterval(createPetal, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="flower-container"
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
    />
  );
}
