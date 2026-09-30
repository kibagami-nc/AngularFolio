import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild } from '@angular/core';
import { SmoothScroll, gsap, reducedMotion } from '../core/motion';

/** Bandeau défilant infini dont la vitesse réagit au scroll (vélocité Lenis). */
@Component({
  selector: 'app-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="track" #track>
      @for (copy of [0, 1]; track copy) {
        <div class="group" [attr.aria-hidden]="copy === 1">
          @for (item of items(); track $index) {
            <span class="item">{{ item }}</span><span class="sep" aria-hidden="true">✦</span>
          }
        </div>
      }
    </div>
  `,
  styles: `
    :host { display: block; overflow: hidden; background: var(--ink); color: var(--paper); padding: 18px 0; }
    .track { display: flex; width: max-content; will-change: transform; }
    .group { display: flex; align-items: center; flex-shrink: 0; }
    .item { font-family: var(--serif); font-size: clamp(1.6rem, 3.5vw, 2.8rem); font-style: italic; font-weight: 300; padding: 0 28px; white-space: nowrap; }
    .item:nth-child(4n+1) { font-style: normal; font-weight: 500; }
    .sep { color: var(--yellow); font-size: 1.2rem; }
  `,
})
export class Marquee {
  readonly items = input.required<string[]>();
  readonly speed = input(60); // px / s

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  constructor() {
    const scroll = inject(SmoothScroll);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (reducedMotion()) return;
      const el = this.track().nativeElement;
      const half = () => el.scrollWidth / 2;
      let x = 0;
      let boost = 0;
      const tick = (_t: number, dt: number) => {
        boost += (Math.min(Math.abs(scroll.velocity) * 2.5, 40) - boost) * 0.08;
        const dir = scroll.velocity < -0.5 ? -1 : 1;
        x -= ((this.speed() + boost * 20) * dir * dt) / 1000;
        const w = half();
        if (x <= -w) x += w;
        if (x > 0) x -= w;
        gsap.set(el, { x });
      };
      gsap.ticker.add(tick);
      destroyRef.onDestroy(() => gsap.ticker.remove(tick));
    });
  }
}
