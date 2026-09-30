import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild,
} from '@angular/core';
import { reducedMotion } from '../core/motion';

export interface SonarContact {
  label: string;
  bearing: number; // degrés, 0 = nord
  range: number; // 0 → 1
}

/**
 * Écran de sonar / radar de navigation en Canvas 2D : balayage rotatif,
 * graduations au compas et « contacts » (compétences) qui s'illuminent au passage du faisceau.
 */
@Component({
  selector: 'app-sonar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #cv role="img" aria-label="Radar de navigation affichant mes domaines de compétence"></canvas>`,
  styles: `:host { display: block; aspect-ratio: 1; width: 100%; } canvas { width: 100%; height: 100%; }`,
})
export class Sonar {
  readonly contacts = input.required<SonarContact[]>();
  readonly period = input(6); // secondes par tour

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  private ctx!: CanvasRenderingContext2D;
  private size = 0;
  private sweep = 0;
  private hits = new Map<number, number>();
  private mouse = { x: -1, y: -1 };
  private raf = 0;
  private last = 0;
  private colors = { ink: '#0d2342', red: '#d2382c', sea: '#1f5f8b', mute: '#7b8292', paper: '#f4f0e6' };

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const cv = this.canvas().nativeElement;
      this.ctx = cv.getContext('2d')!;
      const css = getComputedStyle(document.documentElement);
      for (const k of Object.keys(this.colors) as (keyof typeof this.colors)[]) {
        this.colors[k] = css.getPropertyValue(`--${k}`).trim() || this.colors[k];
      }

      const ro = new ResizeObserver(() => this.resize());
      ro.observe(cv);

      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !reducedMotion()) this.loop(performance.now());
      });
      io.observe(cv);

      const move = (e: PointerEvent) => {
        const r = cv.getBoundingClientRect();
        this.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      const leave = () => (this.mouse = { x: -1, y: -1 });
      cv.addEventListener('pointermove', move);
      cv.addEventListener('pointerleave', leave);

      if (reducedMotion()) {
        this.contacts().forEach((_, i) => this.hits.set(i, 1));
      }

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(this.raf);
        ro.disconnect();
        io.disconnect();
        cv.removeEventListener('pointermove', move);
        cv.removeEventListener('pointerleave', leave);
      });
    });
  }

  private resize() {
    const cv = this.canvas().nativeElement;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    this.size = cv.clientWidth;
    cv.width = cv.height = this.size * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
  }

  private loop = (now: number) => {
    cancelAnimationFrame(this.raf);
    const dt = Math.min((now - (this.last || now)) / 1000, 0.05);
    this.last = now;
    const prev = this.sweep;
    this.sweep = (this.sweep + (dt * 360) / this.period()) % 360;

    // un contact est « touché » quand le faisceau passe dessus
    this.contacts().forEach((c, i) => {
      const crossed = prev <= this.sweep ? c.bearing > prev && c.bearing <= this.sweep : c.bearing > prev || c.bearing <= this.sweep;
      if (crossed) this.hits.set(i, 1);
      else this.hits.set(i, Math.max(0, (this.hits.get(i) ?? 0) - dt * 0.28));
    });

    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  private draw() {
    const { ctx, size: s, colors } = this;
    if (!s) return;
    const c = s / 2;
    const R = s / 2 - s * 0.09;
    const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    ctx.clearRect(0, 0, s, s);

    // Fond de l'écran
    const bg = ctx.createRadialGradient(c, c, 0, c, c, R);
    bg.addColorStop(0, 'rgba(31,95,139,0.10)');
    bg.addColorStop(1, 'rgba(31,95,139,0.02)');
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(c, c, R, 0, Math.PI * 2);
    ctx.fill();

    // Anneaux de distance
    ctx.strokeStyle = colors.ink;
    for (let i = 1; i <= 4; i++) {
      ctx.globalAlpha = i === 4 ? 0.7 : 0.16;
      ctx.lineWidth = i === 4 ? 1.5 : 1;
      ctx.setLineDash(i === 4 ? [] : [2, 4]);
      ctx.beginPath();
      ctx.arc(c, c, (R * i) / 4, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Axes
    ctx.globalAlpha = 0.14;
    for (const a of [0, 45, 90, 135]) {
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(rad(a)) * R, c + Math.sin(rad(a)) * R);
      ctx.lineTo(c - Math.cos(rad(a)) * R, c - Math.sin(rad(a)) * R);
      ctx.stroke();
    }

    // Graduations au compas
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = colors.ink;
    ctx.font = `500 ${Math.max(9, s * 0.022)}px 'IBM Plex Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let a = 0; a < 360; a += 5) {
      const long = a % 30 === 0;
      const r1 = R + 4;
      const r2 = R + (long ? 12 : 7);
      ctx.lineWidth = long ? 1.4 : 0.8;
      ctx.beginPath();
      ctx.moveTo(c + Math.cos(rad(a)) * r1, c + Math.sin(rad(a)) * r1);
      ctx.lineTo(c + Math.cos(rad(a)) * r2, c + Math.sin(rad(a)) * r2);
      ctx.stroke();
      if (long) {
        const lbl = a === 0 ? 'N' : String(a).padStart(3, '0');
        ctx.fillStyle = a === 0 ? colors.red : colors.ink;
        ctx.fillText(lbl, c + Math.cos(rad(a)) * (R + 24), c + Math.sin(rad(a)) * (R + 24));
        ctx.fillStyle = colors.ink;
      }
    }

    // Faisceau de balayage (dégradé conique)
    ctx.globalAlpha = 1;
    const cone = ctx.createConicGradient(rad(this.sweep - 60), c, c);
    cone.addColorStop(0, 'rgba(31,95,139,0)');
    cone.addColorStop(60 / 360, 'rgba(31,95,139,0.32)');
    cone.addColorStop(60 / 360 + 0.0001, 'rgba(31,95,139,0)');
    ctx.fillStyle = cone;
    ctx.beginPath();
    ctx.arc(c, c, R, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colors.sea;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(c, c);
    ctx.lineTo(c + Math.cos(rad(this.sweep)) * R, c + Math.sin(rad(this.sweep)) * R);
    ctx.stroke();

    // Contacts
    ctx.font = `600 ${Math.max(10, s * 0.026)}px 'IBM Plex Mono', monospace`;
    this.contacts().forEach((ct, i) => {
      const x = c + Math.cos(rad(ct.bearing)) * R * ct.range;
      const y = c + Math.sin(rad(ct.bearing)) * R * ct.range;
      const hover = Math.hypot(this.mouse.x - x, this.mouse.y - y) < 40;
      const h = hover ? 1 : (this.hits.get(i) ?? 0);

      ctx.globalAlpha = 0.25 + h * 0.75;
      ctx.fillStyle = colors.red;
      ctx.beginPath();
      ctx.arc(x, y, 3.5 + h * 1.5, 0, Math.PI * 2);
      ctx.fill();
      if (h > 0.05) {
        ctx.globalAlpha = h * 0.5;
        ctx.strokeStyle = colors.red;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 6 + (1 - h) * 22, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.35 + h * 0.65;
      ctx.fillStyle = colors.ink;
      ctx.textAlign = x > c ? 'left' : 'right';
      ctx.fillText(ct.label, x + (x > c ? 12 : -12), y);
    });

    // Navire au centre
    ctx.globalAlpha = 1;
    ctx.fillStyle = colors.ink;
    ctx.beginPath();
    ctx.moveTo(c, c - 9);
    ctx.lineTo(c + 5, c + 6);
    ctx.lineTo(c, c + 3);
    ctx.lineTo(c - 5, c + 6);
    ctx.closePath();
    ctx.fill();
  }
}
