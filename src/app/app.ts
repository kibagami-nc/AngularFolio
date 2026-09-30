import { Component, afterNextRender, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ScrollTrigger, SmoothScroll } from './core/motion';
import { Footer } from './layout/footer';
import { Navbar } from './layout/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <a class="skip" href="#main">Aller au contenu</a>
    <app-navbar />
    <main id="main"><router-outlet /></main>
    <app-footer />
  `,
  styles: `
    .skip { position: absolute; left: -999px; top: 8px; z-index: 100; background: var(--ink); color: var(--paper); padding: 8px 12px; }
    .skip:focus { left: 8px; }
  `,
})
export class App {
  constructor() {
    const scroll = inject(SmoothScroll);
    afterNextRender(() => scroll.init());

    // Retour en haut + recalcul des déclencheurs de scroll à chaque changement de page
    inject(Router).events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      scroll.top();
      setTimeout(() => ScrollTrigger.refresh(), 400);
    });
  }
}
