import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { gsap } from '../core/motion';
import { Theme } from '../core/theme';

export interface RadarPoint {
  label: string;
  value: number; // 0 → 100
  color?: string; // variable CSS, ex. '--bloc-2'
}

/** Graphique radar animé dessiné en Canvas 2D. */
@Component({
  selector: 'app-radar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #cv role="img" [attr.aria-label]="ariaLabel()"></canvas>`,
  styles: `
    :host { display: block; width: 100%; aspect-ratio: 1; max-width: 520px; margin-inline: auto; }
    canvas { width: 100%; height: 100%; }
  `,
})
export class RadarChart {
  readonly points = input.required<RadarPoint[]>();
  readonly ariaLabel = input('Graphique radar des compétences');

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  private readonly destroyRef = inject(DestroyRef);
  private ctx?: CanvasRenderingContext2D;
  private progress = { p: 0 };
  private size = 0;

  constructor() {
    // Les couleurs sont lues à chaque dessin : il suffit de redessiner
    const theme = inject(Theme);
    effect(() => {
      theme.mode();
      this.draw();
    });

    afterNextRender(() => {
      const cv = this.canvas().nativeElement;
      this.ctx = cv.getContext('2d')!;
      const ro = new ResizeObserver(() => this.resize());
      ro.observe(cv);

      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          this.progress.p = 1;
          this.draw();
        } else {
          gsap.to(this.progress, { p: 1, duration: 1.4, ease: 'elastic.out(1, 0.75)', onUpdate: () => this.draw() });
        }
      }, { threshold: 0.3 });
      io.observe(cv);

      this.destroyRef.onDestroy(() => {
        ro.disconnect();
        io.disconnect();
        gsap.killTweensOf(this.progress);
      });
    });
  }

  private cssVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  private resize() {
    const cv = this.canvas().nativeElement;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.size = cv.clientWidth;
    cv.width = this.size * dpr;
    cv.height = this.size * dpr;
    this.ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
  }

  private draw() {
    const ctx = this.ctx;
    if (!ctx || !this.size) return;
    const pts = this.points();
    const n = pts.length;
    const s = this.size;
    const cx = s / 2;
    const cy = s / 2;
    const R = s * 0.32;
    const text = this.cssVar('--ink');
    const grid = this.cssVar('--line');
    const accent = this.cssVar('--sea');
    const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;

    ctx.clearRect(0, 0, s, s);

    // Grille concentrique
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    for (let lvl = 1; lvl <= 4; lvl++) {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = angle(i % n);
        const r = (R * lvl) / 4;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // Axes
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle(i)) * R, cy + Math.sin(angle(i)) * R);
      ctx.stroke();
    }

    // Zone de valeurs
    const p = this.progress.p;
    const coords = pts.map((pt, i) => {
      const r = (R * pt.value * p) / 100;
      return [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r] as const;
    });
    ctx.beginPath();
    coords.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, accent + '10');
    grad.addColorStop(1, accent + '55');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Points + libellés
    const fontSize = Math.max(10, Math.min(12.5, s / 38));
    ctx.font = `600 ${fontSize}px ${"'IBM Plex Mono', monospace"}`;
    pts.forEach((pt, i) => {
      const [x, y] = coords[i];
      const color = pt.color ? this.cssVar(pt.color) : accent;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      const a = angle(i);
      const lx = cx + Math.cos(a) * (R + 18);
      const ly = cy + Math.sin(a) * (R + 18);
      ctx.fillStyle = text;
      ctx.textAlign = Math.abs(Math.cos(a)) < 0.2 ? 'center' : Math.cos(a) > 0 ? 'left' : 'right';
      ctx.textBaseline = Math.abs(Math.sin(a)) < 0.2 ? 'middle' : Math.sin(a) > 0 ? 'top' : 'bottom';
      ctx.fillText(pt.label, lx, ly);
    });
  }
}
