import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin, Flip);

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Défilement fluide (Lenis) synchronisé avec GSAP ScrollTrigger. */
@Injectable({ providedIn: 'root' })
export class SmoothScroll {
  lenis?: Lenis;

  init() {
    if (this.lenis || reducedMotion()) return;
    this.lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => this.lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  top() {
    if (this.lenis) this.lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }

  to(target: string | HTMLElement) {
    if (this.lenis) this.lenis.scrollTo(target, { offset: -80 });
    else (typeof target === 'string' ? document.querySelector(target) : target)?.scrollIntoView({ behavior: 'smooth' });
  }

  get velocity() {
    return this.lenis?.velocity ?? 0;
  }
}

export { gsap, ScrollTrigger, SplitText, Flip };
