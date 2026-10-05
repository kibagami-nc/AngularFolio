import { ChangeDetectionStrategy, Component, ElementRef, Injector, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Flip, ScrollTrigger, gsap, reducedMotion } from '../../core/motion';
import { PROJETS } from '../../data/portfolio';
import { competenceById } from '../../data/referentiel';
import { AnimDirective } from '../../shared/anim.directive';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-projets',
  imports: [PageHero, NgIcon, RouterLink, AnimDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero num="02" label="Projets" flag="R" title="Carnet de" titleEm="missions."
      intro="Les réalisations menées en formation, en stage et en autonomie — chacune rattachée aux compétences du BTS SIO.">
      <div class="filters" role="group" aria-label="Filtrer les projets">
        @for (c of categories; track c) {
          <button [class.on]="filtre() === c" (click)="filter(c)">
            {{ c }} <sup>{{ count(c) }}</sup>
          </button>
        }
      </div>
    </app-page-hero>

    <section class="wrap band">
      <ol class="list" #list appAnim="stagger">
        @for (pr of all; track pr.id; let i = $index) {
          <li [attr.data-flip-id]="pr.id" [hidden]="!visible().has(pr.id)">
            <a [routerLink]="pr.id">
              <span class="num">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <div class="body">
                <div class="top">
                  <span class="chip">{{ pr.categorie }}</span>
                  <span class="ctx mono">{{ pr.contexte }}</span>
                </div>
                <h2>{{ pr.titre }}</h2>
                <p class="soft">{{ pr.resume }}</p>
                <div class="foot">
                  <div class="codes">
                    @for (id of pr.competences; track id) {
                      @let c = comp(id);
                      @if (c) { <span class="code" [class]="'bloc-' + c.bloc" [title]="c.label">{{ c.code }}</span> }
                    }
                  </div>
                  <div class="chips">@for (t of pr.tags; track t) { <span class="chip">{{ t }}</span> }</div>
                </div>
              </div>
              <span class="go"><ng-icon name="lucideArrowUpRight" size="24" /></span>
            </a>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .filters { display: flex; flex-wrap: wrap; gap: 8px; }
    .filters button { font: 500 .92rem var(--sans); padding: 10px 18px; border-radius: 999px; border: 1.5px solid var(--line); background: transparent;
      color: var(--ink-2); cursor: pointer; transition: all .3s var(--ease);
      sup { font-family: var(--mono); font-size: .65rem; color: var(--red); } }
    .filters button:hover { border-color: var(--ink); color: var(--ink); }
    .filters button.on { background: var(--ink); border-color: var(--ink); color: var(--paper); sup { color: var(--yellow); } }
    .list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .list a { position: relative; display: grid; grid-template-columns: auto 1fr auto; gap: 24px; height: 100%; padding: 32px; background: var(--card);
      border: 1px solid var(--line); text-decoration: none; transition: border-color .3s, box-shadow .5s var(--ease), transform .5s var(--ease); }
    .list a:hover { border-color: var(--ink); box-shadow: 8px 8px 0 var(--ink); transform: translate(-4px, -4px);
      .go { background: var(--red); color: var(--paper); border-color: var(--red); transform: rotate(45deg); } }
    .num { font-family: var(--serif); font-style: italic; font-size: 2.6rem; line-height: 1; color: var(--red); }
    .top { display: flex; gap: 12px; align-items: center; margin-bottom: 14px; }
    .ctx { font-family: var(--mono); font-size: .75rem; color: var(--mute); }
    h2 { font-size: clamp(1.6rem, 2.6vw, 2.2rem); margin-bottom: 10px; }
    .foot { display: grid; gap: 12px; margin-top: 20px; }
    .codes { display: flex; flex-wrap: wrap; gap: 5px; }
    .go { width: 52px; height: 52px; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center;
      transition: transform .5s var(--ease), background .3s, color .3s, border-color .3s; }
    @media (max-width: 900px) { .list { grid-template-columns: 1fr; } .list a { grid-template-columns: 1fr; padding: 24px; } .go { display: none; } }
  `,
})
export class Projets {
  protected readonly all = PROJETS;
  protected readonly comp = competenceById;
  protected readonly categories = ['Tous', ...new Set(PROJETS.map((p) => p.categorie))];
  protected readonly filtre = signal('Tous');
  protected readonly visible = computed(
    () => new Set(PROJETS.filter((p) => this.filtre() === 'Tous' || p.categorie === this.filtre()).map((p) => p.id)),
  );
  private readonly list = viewChild.required<ElementRef<HTMLElement>>('list');

  protected count(c: string) {
    return c === 'Tous' ? PROJETS.length : PROJETS.filter((p) => p.categorie === c).length;
  }

  /** Filtrage animé avec GSAP Flip : les cartes glissent vers leur nouvelle place. */
  protected filter(c: string) {
    const items = this.list().nativeElement.querySelectorAll('li');
    const state = Flip.getState(items);
    this.filtre.set(c);
    afterNextRender(
      () => {
        // La hauteur de la page change : on recale les déclencheurs de scroll (pied de page…)
        if (reducedMotion()) return ScrollTrigger.refresh();
        // Pas de `absolute` : les cartes restent dans le flux, la liste garde sa hauteur
        // et le pied de page ne remonte pas sous les cartes pendant l'animation.
        Flip.from(state, {
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.04,
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }),
          onComplete: () => ScrollTrigger.refresh(),
        });
      },
      { injector: this.injector },
    );
  }

  private readonly injector = inject(Injector);
}
