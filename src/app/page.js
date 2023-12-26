"use client";
import styles from "./page.module.scss";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Projects from "@/components/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "@studio-freight/react-lenis";
import Tempus from '@studio-freight/tempus'

const Earth = dynamic(() => import("@/components/earth"), {
  ssr: false,
  loading: () => <img src="/assets/placeholder.png"></img>,
});

if (typeof window !== 'undefined') {
  // reset scroll position
  window.scrollTo(0, 0)
  window.history.scrollRestoration = 'manual'

  gsap.defaults({ ease: 'none' })
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.clearScrollMemory(window.history.scrollRestoration)
  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' })

  // merge rafs
  gsap.ticker.lagSmoothing(0)
  gsap.ticker.remove(gsap.updateRoot)
  Tempus?.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

export default function Home() {
  const lenis = useLenis(ScrollTrigger.update)
  useEffect(() => ScrollTrigger.refresh(), [lenis])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.2,
        },
      })
      .to("#earth", {
        top: "65%",
      });
  });

  return (
    <main className={styles.main}>
      <div className={styles.hero} id="hero">
        <motion.div className={styles.earth} id="earth">
          <Earth />
        </motion.div>
      </div>
    </main>
  );
}
