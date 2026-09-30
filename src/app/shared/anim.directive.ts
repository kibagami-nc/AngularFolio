import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { ScrollTrigger, SplitText, gsap, reducedMotion } from '../core/motion';

export type AnimMode = 'fade' | 'stagger' | 'split' | 'chars' | 'draw' | 'scramble' | 'clip';

/**
 * Animation d'entrée pilotée par GSAP + ScrollTrigger.
 *  - fade     : glisse depuis le bas
 *  - stagger  : les enfants apparaissent en cascade
 *  - split    : le texte monte ligne par ligne (SplitText, masqué)
 *  - chars    : lettre par lettre (titres héros)
 *  - draw     : trace les <path> SVG (DrawSVG)
 *  - scramble : le texte se « décode » (ScrambleText)
 *  - clip     : dévoilement par rideau (images)
 */
@Directive({ selector: '[appAnim]', host: { 'data-anim': '' } })
export class AnimDirective {
  readonly appAnim = input<AnimMode | ''>('');
  readonly animDelay = input(0);
  /** Déclenche immédiatement (sans attendre le scroll) — pour le haut de page. */
  readonly animNow = input(false);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    let ctx: gsap.Context | undefined;
    let split: SplitText | undefined;

    afterNextRender(() => {
      if (reducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }
      const mode = this.appAnim() || 'fade';
      const delay = this.animDelay();
      const scrollTrigger: ScrollTrigger.Vars | undefined = this.animNow()
        ? undefined
        : { trigger: el, start: 'top 88%', once: true };

      const run = () =>
        (ctx = gsap.context(() => {
          gsap.set(el, { autoAlpha: 1 });
          switch (mode) {
            case 'stagger':
              gsap.from(el.children, { autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay, scrollTrigger });
              break;
            case 'split':
            case 'chars': {
              split = SplitText.create(el, {
                // en mode lettres, on garde aussi les mots pour ne jamais couper au milieu d'un mot
                type: mode === 'chars' ? 'lines,words,chars' : 'lines,words',
                mask: 'lines',
                linesClass: 'split-line',
              });
              gsap.from(mode === 'chars' ? split.chars : split.words, {
                yPercent: 110,
                duration: mode === 'chars' ? 1.1 : 0.9,
                stagger: mode === 'chars' ? 0.025 : 0.018,
                ease: 'expo.out',
                delay,
                scrollTrigger,
              });
              break;
            }
            case 'draw':
              gsap.from(el.querySelectorAll('path, line, circle, polyline'), {
                drawSVG: 0, duration: 1.6, stagger: 0.1, ease: 'power2.inOut', delay, scrollTrigger,
              });
              break;
            case 'scramble': {
              const text = el.textContent ?? '';
              el.textContent = '';
              gsap.to(el, { duration: 1.4, delay, scrollTrigger, scrambleText: { text, chars: '01<>/#·°', speed: 0.5 } });
              break;
            }
            case 'clip':
              gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', delay, scrollTrigger });
              break;
            default:
              gsap.from(el, { autoAlpha: 0, y: 48, duration: 1, ease: 'power3.out', delay, scrollTrigger });
          }
        }, el));

      // Découper le texte une fois les polices chargées (sinon mauvaises coupures de ligne)
      if (mode === 'split' || mode === 'chars') document.fonts.ready.then(run);
      else run();
    });

    destroyRef.onDestroy(() => {
      ctx?.revert();
      split?.revert();
    });
  }
}
