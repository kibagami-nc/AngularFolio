import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { gsap, reducedMotion } from '../core/motion';

/** Élément « magnétique » qui suit légèrement le curseur (gsap.quickTo). */
@Directive({ selector: '[appMagnetic]' })
export class MagneticDirective {
  readonly strength = input(0.3);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (reducedMotion() || matchMedia('(pointer: coarse)').matches) return;
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * this.strength());
        y((e.clientY - r.top - r.height / 2) * this.strength());
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      destroyRef.onDestroy(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });
  }
}
