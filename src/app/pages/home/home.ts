import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ScrollTrigger, gsap, reducedMotion } from '../../core/motion';
import { PAGES, PageInfo } from '../../data/pages';
import { CERTIFICATIONS, EXPERIENCES, FORMATIONS, PATRIMOINE, PROFILE, PROJETS, VEILLE } from '../../data/portfolio';
import { COMPETENCES, competenceById } from '../../data/referentiel';
import { coveredCount } from '../../data/stats';
import { AnimDirective } from '../../shared/anim.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { Marquee } from '../../shared/marquee';
import { SignalFlag } from '../../shared/signal-flag';
import { Sonar, SonarContact } from '../../shared/sonar';

interface Escale extends PageInfo {
  num: string;
  data: string;
  figure: string;
  figureLabel: string;
  tone: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIcon, AnimDirective, MagneticDirective, Marquee, SignalFlag, Sonar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly p = PROFILE;
  protected readonly projets = PROJETS;
  protected readonly comp = competenceById;

  protected readonly contacts: SonarContact[] = [
    { label: 'VLAN', bearing: 32, range: 0.62 },
    { label: 'DHCP', bearing: 78, range: 0.38 },
    { label: 'IDS', bearing: 128, range: 0.74 },
    { label: 'Cisco', bearing: 172, range: 0.5 },
    { label: 'Samba', bearing: 214, range: 0.8 },
    { label: 'RGPD', bearing: 258, range: 0.44 },
    { label: 'Support', bearing: 300, range: 0.7 },
    { label: 'Wi-Fi', bearing: 340, range: 0.3 },
  ];

  protected readonly marquee = [
    'Réseaux', 'Cybersécurité', 'Support', 'VLAN', 'DHCP', 'IDS Suricata', 'Samba', 'Cisco', 'RGPD', 'Marine Nationale',
  ];

  protected readonly facts = [
    { k: 'Âge', v: `${PROFILE.age} ans` },
    { k: 'Formation', v: 'BTS SIO · SISR' },
    { k: 'Cap', v: 'Marine Nationale' },
    { k: 'Base', v: 'Dumbéa, NC' },
  ];

  private readonly details: Record<string, Pick<Escale, 'data' | 'figure' | 'figureLabel' | 'tone'>> = {
    '/parcours': {
      data: `${FORMATIONS.length} formations · ${EXPERIENCES.length} expériences · CV`,
      figure: `${EXPERIENCES.length}`, figureLabel: 'expériences au journal', tone: 'var(--sea)',
    },
    '/projets': {
      data: `${PROJETS.length} projets · réseau, sécurité, systèmes, support`,
      figure: `${PROJETS.length}`, figureLabel: 'projets documentés', tone: 'var(--red)',
    },
    '/competences': {
      data: `${coveredCount()}/${COMPETENCES.length} compétences du référentiel · ${CERTIFICATIONS.length} certifications`,
      figure: `${coveredCount()}/${COMPETENCES.length}`, figureLabel: 'compétences couvertes', tone: 'var(--ink)',
    },
    '/patrimoine': {
      data: `${PATRIMOINE.entreprise} · iTop, Knox Manage, PRTG, Active Directory`,
      figure: '19', figureLabel: 'tablettes inventoriées', tone: 'var(--bloc-1)',
    },
    '/veille': {
      data: `${VEILLE.sujet} · ${VEILLE.articles.length} sources`,
      figure: 'IA', figureLabel: 'dans les armées', tone: 'var(--bloc-3)',
    },
    '/contact': {
      data: `${PROFILE.telephone} · ${PROFILE.email}`,
      figure: '24\u00a0h', figureLabel: 'délai de réponse', tone: 'var(--sea)',
    },
  };

  protected readonly categories = [...new Set(PAGES.map((pg) => pg.categorie))].map((cat) => ({
    titre: cat,
    escales: PAGES.filter((pg) => pg.categorie === cat).map((pg) => ({
      ...pg,
      num: String(PAGES.indexOf(pg) + 1).padStart(2, '0'),
      ...this.details[pg.path],
    })),
  }));

  protected readonly active = signal<Escale | null>(null);

  private readonly photo = viewChild.required<ElementRef<HTMLElement>>('photo');
  private readonly preview = viewChild.required<ElementRef<HTMLElement>>('preview');
  private readonly pin = viewChild.required<ElementRef<HTMLElement>>('pin');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly progress = viewChild.required<ElementRef<HTMLElement>>('progress');

  private moveX?: (v: number) => void;
  private moveY?: (v: number) => void;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const prev = this.preview().nativeElement;
      this.moveX = gsap.quickTo(prev, 'x', { duration: 0.5, ease: 'power3' });
      this.moveY = gsap.quickTo(prev, 'y', { duration: 0.5, ease: 'power3' });

      if (reducedMotion()) return;
      const mm = gsap.matchMedia();

      // Parallaxe de la photo
      const img = this.photo().nativeElement.querySelector('img')!;
      const parallax = gsap.fromTo(img, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: this.photo().nativeElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Projets : défilement horizontal épinglé (grand écran uniquement)
      mm.add('(min-width: 900px)', () => {
        const track = this.track().nativeElement;
        const distance = () => track.scrollWidth - track.clientWidth;
        gsap.to(track.children, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: this.pin().nativeElement,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (st) => gsap.set(this.progress().nativeElement, { scaleX: st.progress }),
          },
        });
      });

      destroyRef.onDestroy(() => {
        mm.revert();
        parallax.scrollTrigger?.kill();
        parallax.kill();
      });
      ScrollTrigger.refresh();
    });
  }

  protected hover(e: Escale | null) {
    this.active.set(e);
  }

  protected follow(ev: PointerEvent) {
    this.moveX?.(ev.clientX);
    this.moveY?.(ev.clientY);
  }
}
