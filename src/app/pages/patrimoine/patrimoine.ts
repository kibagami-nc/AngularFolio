import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { SmoothScroll } from '../../core/motion';
import { PATRIMOINE } from '../../data/portfolio';
import { competenceById } from '../../data/referentiel';
import { AnimDirective } from '../../shared/anim.directive';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-patrimoine',
  imports: [PageHero, NgIcon, AnimDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero num="04" label="Patrimoine informatique" flag="I" title="S'interroger sur" titleEm="le patrimoine."
      intro="Normes, configurations, compétences : comment Newrest NC gère son parc informatique, observé et vécu pendant mon stage.">
      <nav class="toc" aria-label="Sommaire">
        @for (a of pa.axes; track a.id; let i = $index) {
          <a [href]="'#' + a.id" (click)="goTo($event, a.id)"><span class="mono">0{{ i + 1 }}</span>{{ a.titre }} {{ a.titreEm }}</a>
        }
      </nav>
    </app-page-hero>

    <!-- Contexte -->
    <section class="wrap band">
      <span class="label" appAnim>Le terrain — {{ pa.entreprise }}, {{ pa.periode }}</span>
      <p class="quote" appAnim="split">{{ pa.contexte }}</p>
      <dl class="figures" appAnim="stagger">
        @for (c of pa.chiffres; track c.label) {
          <div><dt>{{ c.valeur }}</dt><dd>{{ c.label }}</dd></div>
        }
      </dl>
    </section>

    @for (a of pa.axes; track a.id; let ai = $index) {
      <section class="axe" [id]="a.id" [class.alt]="ai % 2 === 1">
        <div class="wrap axe-grid">
          <header class="axe-head">
            <span class="big-n">0{{ ai + 1 }}</span>
            <h2 appAnim="split">{{ a.titre }} <em>{{ a.titreEm }}</em></h2>
            <p class="soft" appAnim>{{ a.sousTitre }}</p>
          </header>

          <ol class="qa">
            @for (item of a.questions; track item.q; let qi = $index) {
              <li appAnim>
                <p class="q"><span class="mono">Q{{ ai + 1 }}.{{ qi + 1 }}</span>{{ item.q }}</p>
                <p class="r">{{ item.r }}</p>
                @if (item.points) {
                  <ul class="points">
                    @for (pt of item.points; track pt) { <li>{{ pt }}</li> }
                  </ul>
                }
                @if (item.outils) {
                  <div class="chips">@for (o of item.outils; track o) { <span class="chip">{{ o }}</span> }</div>
                }
              </li>
            }
          </ol>
        </div>
      </section>

      @if (a.id === 'configurations') {
        <!-- Nomenclature + inventaire : l'inventaire sans GLPI -->
        <section class="band dark">
          <div class="wrap twin">
            <div>
              <span class="label" appAnim>Nomenclature</span>
              <h2 appAnim="split">Un nom, <em>une adresse.</em></h2>
              <p class="hostname" appAnim>
                @for (part of pa.nomenclature.exemple; track $index; let last = $last) {
                  <span>{{ part }}</span>@if (!last) {<i>-</i>}
                }
              </p>
              <dl class="parts" appAnim="stagger">
                @for (pt of pa.nomenclature.parties; track pt.code) {
                  <div><dt>{{ pt.code }}</dt><dd>{{ pt.sens }}</dd></div>
                }
              </dl>
              <p class="note" appAnim>{{ pa.nomenclature.note }}</p>
            </div>

            <div>
              <span class="label" appAnim>Inventaire Knox Manage</span>
              <h2 appAnim="split">19 tablettes, <em>une fiche chacune.</em></h2>
              <table appAnim>
                <thead><tr><th>Champ relevé</th><th>Utilité</th></tr></thead>
                <tbody>
                  @for (f of pa.inventaire; track f.champ) {
                    <tr><td>{{ f.champ }}</td><td>{{ f.detail }}</td></tr>
                  }
                </tbody>
              </table>
              <p class="note" appAnim>{{ pa.inventaireNote }}</p>
            </div>
          </div>
        </section>
      }
    }

    <!-- Critères du référentiel -->
    <section class="wrap band">
      <div class="section-head">
        <div>
          <span class="label" appAnim>Référentiel — {{ comp.code }}</span>
          <h2 appAnim="split">{{ comp.label }}, <em>critère par critère.</em></h2>
        </div>
      </div>
      <ul class="criteria">
        @for (c of comp.criteres; track c; let i = $index) {
          @let preuve = pa.preuves[i];
          <li [class.missing]="!preuve" appAnim>
            <span class="state">
              <ng-icon [name]="preuve ? 'lucideCircleCheck' : 'lucideClock'" size="20" />
            </span>
            <h3>{{ c }}</h3>
            <p class="soft">{{ preuve ?? 'Non abordé pendant ce stage.' }}</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .mono { font-family: var(--mono); font-size: .78rem; }
    .quote { font-family: var(--serif); font-size: clamp(1.4rem, 2.8vw, 2.2rem); line-height: 1.25; letter-spacing: -.015em; margin: 24px 0 0; max-width: 36ch; }

    .toc { display: flex; flex-direction: column; gap: 4px; min-width: 260px; }
    .toc a { display: flex; gap: 12px; align-items: baseline; padding: 8px 0; border-bottom: 1px solid var(--line); text-decoration: none; font-weight: 500;
      transition: padding .3s var(--ease), color .3s; .mono { color: var(--red); } }
    .toc a:hover { padding-left: 8px; color: var(--red); }

    .figures { display: grid; grid-template-columns: repeat(5, 1fr); margin: 56px 0 0; border-top: 1px solid var(--ink); }
    .figures div { padding: 20px 16px 0 0; }
    .figures dt { font-family: var(--serif); font-size: clamp(2.4rem, 5vw, 3.6rem); line-height: 1; color: var(--red); }
    .figures dd { margin: 8px 0 0; font-size: .92rem; color: var(--ink-2); }

    .axe { padding-block: clamp(64px, 9vw, 112px); border-top: 1px solid var(--line); scroll-margin-top: 80px; }
    .axe.alt { background: var(--card); }
    .axe-grid { display: grid; grid-template-columns: 340px 1fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
    .axe-head { position: sticky; top: 100px; }
    .big-n { display: block; font-family: var(--serif); font-style: italic; font-size: clamp(4rem, 8vw, 6.5rem); line-height: .9; color: var(--red); }
    .axe-head h2 { font-size: clamp(2rem, 3.6vw, 2.8rem); margin: 16px 0 12px; }

    .qa { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--ink); }
    .qa > li { padding: 28px 0; border-bottom: 1px solid var(--line); }
    .q { display: flex; gap: 14px; align-items: baseline; margin: 0 0 12px; font-family: var(--serif); font-size: clamp(1.2rem, 2vw, 1.45rem); line-height: 1.3;
      .mono { color: var(--red); flex: none; } }
    .r { margin: 0; color: var(--ink-2); max-width: 70ch; }
    .points { margin: 14px 0 0; padding: 0; list-style: none; max-width: 70ch; }
    .points li { position: relative; padding: 6px 0 6px 22px; color: var(--ink-2); }
    .points li::before { content: ''; position: absolute; left: 2px; top: 15px; width: 10px; height: 1.5px; background: var(--sea); }
    .qa .chips { margin-top: 16px; }

    .dark { background: var(--ink); color: var(--paper); }
    .dark .label { color: rgba(244,240,230,.6); }
    .dark h2 em { color: var(--yellow); }
    .twin { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 96px); align-items: start; }
    .twin h2 { font-size: clamp(2rem, 4vw, 3rem); margin: 14px 0 28px; }
    .hostname { font-family: var(--mono); font-size: clamp(1.6rem, 4vw, 2.6rem); margin: 0 0 24px; letter-spacing: .02em;
      span { border-bottom: 3px solid var(--yellow); padding-bottom: 2px; } i { font-style: normal; opacity: .5; margin: 0 4px; } }
    .parts { margin: 0; }
    .parts div { display: grid; grid-template-columns: 110px 1fr; gap: 16px; padding: 10px 0; border-bottom: 1px solid rgba(244,240,230,.15); }
    .parts dt { font-family: var(--mono); color: var(--yellow); }
    .parts dd { margin: 0; }
    .note { opacity: .75; font-size: .95rem; margin-top: 20px; }
    table { width: 100%; border-collapse: collapse; font-size: .95rem; }
    th { text-align: left; font-family: var(--mono); font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; color: var(--yellow);
      font-weight: 500; padding: 0 12px 10px 0; border-bottom: 1px solid var(--paper); }
    td { padding: 10px 12px 10px 0; border-bottom: 1px solid rgba(244,240,230,.15); }
    td:first-child { font-weight: 600; white-space: nowrap; }

    .criteria { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .criteria li { display: grid; grid-template-columns: 32px 1fr; gap: 4px 14px; padding: 24px; border: 1px solid var(--line); background: var(--card);
      border-left: 4px solid var(--bloc-1); }
    .criteria .state { grid-row: span 2; color: var(--bloc-1); padding-top: 2px; }
    .criteria h3 { font-family: var(--sans); font-size: 1.02rem; font-weight: 600; letter-spacing: 0; line-height: 1.35; margin: 0; }
    .criteria p { margin: 0; }
    .criteria li.missing { border-left-color: var(--line); background: transparent; .state { color: var(--mute); } p { font-style: italic; } }

    @media (max-width: 960px) {
      .figures { grid-template-columns: repeat(3, 1fr); row-gap: 24px; }
      .axe-grid, .twin, .criteria { grid-template-columns: 1fr; }
      .axe-head { position: static; }
      .toc { min-width: 0; width: 100%; }
    }
    @media (max-width: 560px) {
      .figures { grid-template-columns: 1fr 1fr; }
    }
  `,
})
export class Patrimoine {
  protected readonly pa = PATRIMOINE;
  protected readonly comp = competenceById('b1-patrimoine')!;
  private readonly scroll = inject(SmoothScroll);

  // le <base href="/"> enverrait « #id » vers l'accueil : on défile nous-mêmes
  protected goTo(e: Event, id: string) {
    e.preventDefault();
    this.scroll.to('#' + id);
  }
}
