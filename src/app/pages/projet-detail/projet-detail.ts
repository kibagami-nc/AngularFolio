import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { PROJETS } from '../../data/portfolio';
import { competenceById } from '../../data/referentiel';
import { AnimDirective } from '../../shared/anim.directive';

@Component({
  selector: 'app-projet-detail',
  imports: [NgIcon, RouterLink, AnimDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (pr(); as pr) {
      <header class="wrap head">
        <a routerLink="/projets" class="back mono"><ng-icon name="lucideArrowLeft" size="15" /> Carnet de missions</a>
        <div class="meta">
          <span class="num">{{ (index() + 1).toString().padStart(2, '0') }}</span>
          <span class="chip">{{ pr.categorie }}</span>
          <span class="chip">{{ pr.contexte }}</span>
        </div>
        <h1 appAnim="split" [animNow]="true">{{ pr.titre }}</h1>
        <p class="lead" appAnim [animNow]="true" [animDelay]="0.3">{{ pr.resume }}</p>
      </header>

      <section class="wrap body">
        <div class="main">
          <div class="block" appAnim>
            <span class="label">Objectifs</span>
            <ul class="obj">@for (o of pr.objectifs; track o) { <li>{{ o }}</li> }</ul>
          </div>
          <div class="block" appAnim>
            <span class="label">Déroulé</span>
            <ol class="steps">@for (s of pr.etapes; track s) { <li>{{ s }}</li> }</ol>
          </div>
          <div class="block result" appAnim>
            <span class="label">Résultat</span>
            <p>{{ pr.resultat }}</p>
          </div>
        </div>

        <aside appAnim>
          <div class="box">
            <span class="label no-dash">Compétences mobilisées</span>
            @for (c of comps(); track c.id) {
              <div class="comp" [class]="'bloc-' + c.bloc"><span class="code">{{ c.code }}</span>{{ c.label }}</div>
            }
          </div>
          <div class="box">
            <span class="label no-dash">Outils & notions</span>
            <div class="chips">@for (t of pr.tags; track t) { <span class="chip">{{ t }}</span> }</div>
          </div>
        </aside>
      </section>

      <nav class="wrap pager">
        @if (prev(); as p) {
          <a [routerLink]="['/projets', p.id]"><span class="mono">← Précédent</span>{{ p.titre }}</a>
        } @else { <span></span> }
        @if (next(); as n) {
          <a class="next" [routerLink]="['/projets', n.id]"><span class="mono">Suivant →</span>{{ n.titre }}</a>
        }
      </nav>
    } @else {
      <section class="wrap band head"><h1>Projet introuvable</h1><a routerLink="/projets" class="arrow-link">Retour aux projets</a></section>
    }
  `,
  styles: `
    .head { padding-top: 130px; padding-bottom: 56px; border-bottom: 1px solid var(--line); }
    .back { display: inline-flex; align-items: center; gap: 8px; font-size: .8rem; text-decoration: none; color: var(--ink-2); margin-bottom: 40px; }
    .back:hover { color: var(--red); }
    .meta { display: flex; align-items: center; gap: 10px; }
    .num { font-family: var(--serif); font-style: italic; font-size: 2rem; color: var(--red); margin-right: 8px; }
    h1 { font-size: clamp(2.6rem, 7vw, 6rem); letter-spacing: -.035em; margin: 20px 0 24px; max-width: 16ch; }
    .body { display: grid; grid-template-columns: 1fr 380px; gap: clamp(32px, 6vw, 96px); padding-block: clamp(48px, 8vw, 96px); }
    .block { margin-bottom: 56px; }
    .obj { list-style: none; padding: 0; margin: 18px 0 0; }
    .obj li { font-family: var(--serif); font-size: clamp(1.25rem, 2vw, 1.6rem); padding: 14px 0; border-bottom: 1px solid var(--line); line-height: 1.3; }
    .steps { counter-reset: s; list-style: none; padding: 0; margin: 18px 0 0; }
    .steps li { counter-increment: s; display: grid; grid-template-columns: 56px 1fr; padding: 16px 0; border-bottom: 1px dashed var(--line); color: var(--ink-2); }
    .steps li::before { content: counter(s, decimal-leading-zero); font-family: var(--mono); font-size: .85rem; color: var(--red); padding-top: 2px; }
    .result p { margin-top: 18px; padding: 28px; background: var(--ink); color: var(--paper); font-family: var(--serif); font-size: 1.35rem; line-height: 1.4; }
    aside { position: sticky; top: 100px; align-self: start; display: grid; gap: 20px; }
    .box { padding: 24px; background: var(--card); border: 1px solid var(--line); .label { margin-bottom: 14px; } }
    .comp { display: flex; gap: 12px; align-items: baseline; padding: 10px 0; border-top: 1px solid var(--line); font-size: .92rem; line-height: 1.4; .code { flex-shrink: 0; } }
    .pager { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding-bottom: 96px; }
    .pager a { display: flex; flex-direction: column; gap: 8px; padding: 28px; border: 1px solid var(--line); text-decoration: none;
      font-family: var(--serif); font-size: 1.5rem; transition: background .4s var(--ease), color .4s; .mono { font-family: var(--mono); font-size: .75rem; color: var(--red); } }
    .pager a:hover { background: var(--ink); color: var(--paper); .mono { color: var(--yellow); } }
    .next { text-align: right; }
    @media (max-width: 900px) { .body, .pager { grid-template-columns: 1fr; } aside { position: static; } }
  `,
})
export class ProjetDetail {
  readonly id = input.required<string>();
  protected readonly index = computed(() => PROJETS.findIndex((p) => p.id === this.id()));
  protected readonly pr = computed(() => PROJETS[this.index()]);
  protected readonly prev = computed(() => PROJETS[this.index() - 1]);
  protected readonly next = computed(() => PROJETS[this.index() + 1]);
  protected readonly comps = computed(() =>
    (this.pr()?.competences ?? []).map(competenceById).filter((c) => !!c).sort((a, b) => a.code.localeCompare(b.code)),
  );
}
