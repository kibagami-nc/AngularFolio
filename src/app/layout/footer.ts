import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { SmoothScroll } from '../core/motion';
import { PAGES } from '../data/pages';
import { PROFILE } from '../data/portfolio';
import { AnimDirective } from '../shared/anim.directive';
import { MagneticDirective } from '../shared/magnetic.directive';
import { SignalFlag } from '../shared/signal-flag';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgIcon, SignalFlag, AnimDirective, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap">
      <div class="top">
        <h2 appAnim="chars">Bon <em>vent.</em></h2>
        <div class="flags" aria-label="Pavillons B-O-N-V-E-N-T">
          @for (l of 'BONVENT'.split(''); track $index) {
            <app-flag class="wave" [letter]="l" [size]="30" [style.--d]="$index * 0.15 + 's'" />
          }
        </div>
      </div>

      <div class="grid">
        <div>
          <span class="label">Me joindre</span>
          <a class="big" [href]="'mailto:' + p.email">{{ p.email }}</a>
          <a class="big" [href]="p.telephoneHref">{{ p.telephone }}</a>
        </div>
        <div>
          <span class="label">Pages</span>
          <ul>
            <li><a routerLink="/">Accueil</a></li>
            @for (pg of pages; track pg.path) { <li><a [routerLink]="pg.path">{{ pg.label }}</a></li> }
          </ul>
        </div>
        <div>
          <span class="label">Position</span>
          <p>{{ p.ville }}<br /><span class="mono">{{ p.coordonnees }}</span></p>
          <p class="mono">Heure locale — {{ time() }}</p>
          <a [href]="p.linkedin" target="_blank" rel="noopener" class="ext">LinkedIn <ng-icon name="lucideArrowUpRight" size="14" /></a>
        </div>
      </div>

      <div class="bottom">
        <span>© {{ year }} {{ p.prenom }} {{ p.nom }} · BTS SIO SISR</span>
        <button class="up" (click)="scroll.top()" appMagnetic aria-label="Revenir en haut">
          <ng-icon name="lucideArrowUpRight" size="18" />
        </button>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; background: var(--ink); color: var(--paper); margin-top: 0; padding: clamp(64px, 10vw, 120px) 0 28px; }
    .top { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; flex-wrap: wrap; padding-bottom: 48px; border-bottom: 1px solid color-mix(in srgb, var(--paper) 18%, transparent); }
    h2 { font-size: clamp(4rem, 14vw, 11rem); margin: 0; line-height: .9; em { color: var(--yellow); } }
    .flags { display: flex; gap: 6px; padding-bottom: 18px; }
    .grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; padding: 48px 0; }
    .label { color: color-mix(in srgb, var(--paper) 55%, transparent); margin-bottom: 18px; }
    .big { display: block; width: fit-content; font-family: var(--serif); font-size: clamp(1.3rem, 2.4vw, 1.9rem); text-decoration: none; margin-bottom: 8px;
      background: linear-gradient(var(--yellow), var(--yellow)) 0 100% / 0 1.5px no-repeat; transition: background-size .5s var(--ease); }
    .big:hover { background-size: 100% 1.5px; }
    ul { list-style: none; margin: 0; padding: 0; }
    li a { text-decoration: none; opacity: .8; line-height: 2; } li a:hover { opacity: 1; color: var(--yellow); }
    p { opacity: .85; }
    .mono { font-family: var(--mono); font-size: .82rem; }
    .ext { display: inline-flex; align-items: center; gap: 6px; text-decoration: none; color: var(--yellow); }
    .bottom { display: flex; justify-content: space-between; align-items: center; font-size: .82rem; opacity: .7; }
    .up { width: 48px; height: 48px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--paper) 40%, transparent); background: transparent; color: var(--paper);
      display: grid; place-items: center; cursor: pointer; ng-icon { transform: rotate(-45deg); } }
    .up:hover { background: var(--yellow); color: var(--ink); border-color: var(--yellow); }
    @media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
  `,
})
export class Footer {
  protected readonly p = PROFILE;
  protected readonly pages = PAGES;
  protected readonly year = new Date().getFullYear();
  protected readonly scroll = inject(SmoothScroll);
  private readonly fmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Pacific/Noumea' });
  protected readonly time = signal(this.fmt.format(new Date()));

  constructor() {
    const id = setInterval(() => this.time.set(this.fmt.format(new Date())), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }
}
