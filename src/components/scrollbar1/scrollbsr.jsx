'use client'
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import styles from './scrollbar.module.scss'

export const Scrollbar = () => {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net/en#easeOutExpo
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      inifinite: false
    });
    
    const thumb = document.getElementById("thumb");
    
    lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
      // Get the height of the body
      const bodyHeight = document.body.scrollHeight;
    
      // Calculate the ratio of the viewport height to the body height
      const ratio = window.innerHeight / bodyHeight;
    
      // Set the width of the thumb
      thumb.style.height = `${ratio * 100}%`;
    
      thumb.style.transform = `translate3d(0,${
        progress * (window.innerHeight - thumb.getBoundingClientRect().height)
      }px,0)`;
      thumb.style.opacity = '1'
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
  })

  return (
    <div className={styles.scrollbar}>
      <div className={styles.scrollbar_wrapper}>
        <div className={styles.thumb} id="thumb"></div>
      </div>
    </div>
  );
}