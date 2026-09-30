import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { filter } from 'rxjs';
import { gsap, reducedMotion } from '../core/motion';
import { PAGES } from '../data/pages';
import { PROFILE } from '../data/portfolio';
import { MagneticDirective } from '../shared/magnetic.directive';
import { SignalFlag } from '../shared/signal-flag';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgIcon, SignalFlag, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '[class.hidden]': 'hidden()',
    '[class.solid]': 'solid()',
  },
  template: `
    <nav class="wrap bar" aria-label="Navigation principale">
      <a routerLink="/" class="brand" aria-label="Accueil">
        <span class="flags"><app-flag letter="R" [size]="22" /><app-flag letter="B" [size]="22" /></span>
        <span class="name">{{ p.prenom }} <em>{{ p.nom }}</em></span>
      </a>

      <ul class="links">
        @for (l of links; track l.path) {
          <li><a [routerLink]="l.path" routerLinkActive="active">{{ l.label }}</a></li>
        }
      </ul>

      <a routerLink="/contact" class="btn solid cta" appMagnetic>Contact <ng-icon name="lucideArrowUpRight" size="16" /></a>

      <button class="burger" (click)="toggle()" [attr.aria-expanded]="open()" aria-label="Menu">
        <span></span><span></span>
      </button>
    </nav>

    <!-- Menu plein écran (mobile) -->
    <div class="overlay" #overlay [class.open]="open()" [attr.aria-hidden]="!open()">
      <div class="wrap">
        <span class="label">Plan de navigation</span>
        <ul>
          <li><a routerLink="/" (click)="toggle(false)"><span>00</span>Accueil</a></li>
          @for (l of allPages; track l.path; let i = $index) {
            <li><a [routerLink]="l.path" (click)="toggle(false)"><span>{{ '0' + (i + 1) }}</span>{{ l.label }}
              <app-flag [letter]="l.flag" [size]="30" /></a></li>
          }
        </ul>
        <p class="label no-dash">{{ p.coordonnees }} — {{ p.ville }}</p>
      </div>
    </div>
  `,
  styles: `
    :host { position: fixed; inset: 0 0 auto; z-index: 60; transition: transform .5s var(--ease), background .3s; }
    :host(.hidden) { transform: translateY(-100%); }
    :host(.solid) { background: color-mix(in srgb, var(--paper) 88%, transparent); backdrop-filter: blur(10px); box-shadow: 0 1px 0 var(--line); }
    .bar { display: flex; align-items: center; gap: 28px; height: 76px; position: relative; z-index: 2; }
    .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .flags { display: flex; gap: 3px; }
    .name { font-family: var(--serif); font-size: 1.25rem; font-weight: 500; letter-spacing: -.01em; white-space: nowrap;
      em { font-style: italic; font-weight: 400; } }
    .links { display: flex; gap: 6px; list-style: none; margin: 0 0 0 auto; padding: 0; }
    .links a { position: relative; display: block; padding: 8px 14px; text-decoration: none; font-weight: 500; font-size: .95rem; color: var(--ink-2);
      transition: color .2s; }
    .links a::after { content: ''; position: absolute; left: 14px; right: 14px; bottom: 2px; height: 1.5px; background: var(--red);
      transform: scaleX(0); transform-origin: right; transition: transform .45s var(--ease); }
    .links a:hover { color: var(--ink); }
    .links a:hover::after, .links a.active::after { transform: scaleX(1); transform-origin: left; }
    .links a.active { color: var(--ink); }
    .cta { height: 44px; padding: 0 20px; font-size: .9rem; }
    .burger { display: none; margin-left: auto; width: 44px; height: 44px; border: 1.5px solid var(--ink); border-radius: 50%; background: transparent;
      cursor: pointer; position: relative;
      span { position: absolute; left: 12px; right: 12px; height: 1.5px; background: var(--ink); transition: transform .4s var(--ease); }
      span:first-child { top: 17px; } span:last-child { top: 24px; } }
    .burger[aria-expanded=true] span:first-child { transform: translateY(3.5px) rotate(45deg); }
    .burger[aria-expanded=true] span:last-child { transform: translateY(-3.5px) rotate(-45deg); }

    .overlay { position: fixed; inset: 0; z-index: 1; background: var(--paper); padding-top: 110px; visibility: hidden;
      clip-path: circle(0% at calc(100% - 44px) 38px); transition: clip-path .7s var(--ease), visibility 0s .7s; }
    .overlay.open { visibility: visible; clip-path: circle(150% at calc(100% - 44px) 38px); transition: clip-path .8s var(--ease); }
    .overlay ul { list-style: none; padding: 0; margin: 24px 0 40px; }
    .overlay li { border-bottom: 1px solid var(--line); }
    .overlay a { display: flex; align-items: center; gap: 18px; padding: 14px 0; font-family: var(--serif); font-size: clamp(2rem, 9vw, 3.2rem);
      text-decoration: none; line-height: 1.1;
      span { font-family: var(--mono); font-size: .8rem; color: var(--red); }
      app-flag { margin-left: auto; } }

    @media (max-width: 860px) {
      .links, .cta { display: none; }
      .burger { display: block; }
      :host:has(.overlay.open) { background: transparent; box-shadow: none; transform: none; }
    }
  `,
})
export class Navbar {
  protected readonly p = PROFILE;
  protected readonly links = PAGES.filter((pg) => pg.path !== '/contact');
  protected readonly allPages = PAGES;
  protected readonly open = signal(false);
  protected readonly hidden = signal(false);
  protected readonly solid = signal(false);
  private readonly overlay = viewChild.required<ElementRef<HTMLElement>>('overlay');
  private lastY = 0;

  constructor() {
    inject(Router).events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => this.open.set(false));
    inject(DestroyRef);

    // Animation en cascade des liens du menu mobile
    effect(() => {
      if (!this.open() || reducedMotion()) return;
      const items = this.overlay().nativeElement.querySelectorAll('li');
      gsap.fromTo(items, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'expo.out', delay: 0.15 });
    });
  }

  protected toggle(v = !this.open()) {
    this.open.set(v);
  }

  protected onScroll() {
    const y = window.scrollY;
    this.solid.set(y > 20);
    // masque la barre en descendant, la réaffiche en remontant
    this.hidden.set(y > 400 && y > this.lastY && !this.open());
    this.lastY = y;
  }
}
