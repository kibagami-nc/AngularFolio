import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { VEILLE } from '../../data/portfolio';
import { AnimDirective } from '../../shared/anim.directive';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-veille',
  imports: [PageHero, NgIcon, AnimDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero num="04" label="Veille technologique" flag="V" title="L'IA dans" titleEm="les armées." [intro]="v.intro">
      <div class="chips">@for (t of v.tags; track t) { <span class="chip">#{{ t }}</span> }</div>
    </app-page-hero>

    <section class="wrap band why">
      <span class="label" appAnim>Pourquoi ce sujet</span>
      <p class="quote" appAnim="split">{{ v.pourquoi }}</p>
    </section>

    <section class="band axes-band">
      <div class="wrap">
        <div class="section-head"><div><span class="label" appAnim>Trois axes</span><h2 appAnim="split">Ce que l'IA <em>change.</em></h2></div></div>
        <div class="axes" appAnim="stagger">
          @for (a of v.axes; track a.titre; let i = $index) {
            <article>
              <span class="n mono">0{{ i + 1 }}</span>
              <ng-icon [name]="a.icon" size="34" />
              <h3>{{ a.titre }}</h3>
              <p class="soft">{{ a.texte }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="wrap band">
      <div class="section-head"><div><span class="label" appAnim>Sources</span><h2 appAnim="split">Revue de <em>presse.</em></h2></div></div>
      <ul class="press">
        @for (a of v.articles; track a.url) {
          <li appAnim>
            <a [href]="a.url" target="_blank" rel="noopener">
              <span class="src mono">{{ a.source }}<em>{{ a.type }}</em></span>
              <span class="title">{{ a.titre }}</span>
              <span class="go"><ng-icon name="lucideArrowUpRight" size="22" /></span>
            </a>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .mono { font-family: var(--mono); font-size: .78rem; }
    .quote { font-family: var(--serif); font-size: clamp(1.6rem, 3.4vw, 2.8rem); line-height: 1.2; letter-spacing: -.015em; margin: 24px 0 0; max-width: 30ch; }
    .axes-band { background: var(--card); border-block: 1px solid var(--line); }
    .axes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .axes article { position: relative; padding: 32px; border: 1px solid var(--line); background: var(--paper); transition: transform .5s var(--ease), box-shadow .5s var(--ease); }
    .axes article:hover { transform: translate(-4px,-4px); box-shadow: 8px 8px 0 var(--sea); }
    .axes .n { position: absolute; top: 20px; right: 24px; color: var(--red); }
    .axes ng-icon { color: var(--sea); }
    .axes h3 { font-size: 1.9rem; margin: 22px 0 10px; }
    .press { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--ink); }
    .press li { border-bottom: 1px solid var(--line); }
    .press a { display: grid; grid-template-columns: 200px 1fr 56px; gap: 24px; align-items: center; padding: 28px 8px; text-decoration: none;
      transition: padding .4s var(--ease), background .4s; }
    .press a:hover { background: var(--card); padding-inline: 20px; .go { background: var(--red); color: var(--paper); border-color: var(--red); transform: rotate(45deg); } }
    .src { display: flex; flex-direction: column; gap: 2px; color: var(--red); font-weight: 600; em { font-style: normal; font-weight: 400; color: var(--mute); } }
    .title { font-family: var(--serif); font-size: clamp(1.3rem, 2.2vw, 1.8rem); line-height: 1.25; }
    .go { width: 52px; height: 52px; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center; transition: all .4s var(--ease); }
    @media (max-width: 860px) { .axes { grid-template-columns: 1fr; } .press a { grid-template-columns: 1fr; gap: 8px; } .go { display: none; } }
  `,
})
export class Veille {
  protected readonly v = VEILLE;
}
