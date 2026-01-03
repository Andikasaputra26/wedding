"use client";
import { JSX } from "react";

import { useState } from "react";
import Cover from "./components/Cover";
import Hero from "./components/Hero";
import Couple from "./components/Couple";
import Profile from "./components/Profile";
import Event from "./components/Event";
import Gallery from "./components/Gallery";
import Location from "./components/Location";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import MusicButton from "./components/MusicButton";

import FloatingFlowers from "./components/FloatingFlowers";
import SmoothScroll from "./components/SmoothScroll";

export default function Home(): JSX.Element {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <>
      {!opened && <Cover onOpen={() => setOpened(true)} />}

      <FloatingFlowers />

      <main
        className={`transition-all duration-[1500ms] ${
          opened ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
        }`}
      >
        <SmoothScroll />
        <Hero />
        <Couple />
        <Profile />
        <Event />
        <Gallery />
        <Location />
        <RSVP />
        <Footer />
      </main>

      <MusicButton />
    </>
  );
}
