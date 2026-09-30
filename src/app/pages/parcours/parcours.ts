import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { gsap, reducedMotion } from '../../core/motion';
import { EXPERIENCES, FORMATIONS, PROFILE } from '../../data/portfolio';
import { AnimDirective } from '../../shared/anim.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-parcours',
  imports: [PageHero, NgIcon, AnimDirective, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero num="01" label="Parcours" flag="P" title="Journal" titleEm="de bord."
      intro="Qui je suis, d'où je viens et où je vais : ma formation, mes expériences et mon CV." />

    <!-- Profil -->
    <section class="wrap band profile">
      <figure class="portrait" appAnim="clip">
        <img [src]="p.photo" [alt]="'Portrait de ' + p.prenom" width="480" height="1064" />
      </figure>
      <div>
        <span class="label" appAnim>Fiche signalétique</span>
        <h2 appAnim="split">{{ p.prenom }} {{ p.nom }}, <em>{{ p.age }} ans.</em></h2>
        @for (para of p.presentation; track $index) { <p class="soft" appAnim>{{ para }}</p> }

        <dl class="sheet" appAnim="stagger">
          <div><dt>Objectif</dt><dd>{{ p.objectif }}</dd></div>
          <div><dt>Qualités</dt><dd>{{ p.qualites.join(' · ') }}</dd></div>
          <div><dt>Langues</dt><dd>@for (l of p.langues; track l.nom) { {{ l.nom }} — niveau {{ l.niveau }} }</dd></div>
          <div><dt>Base</dt><dd>{{ p.ville }} <span class="mono">({{ p.coordonnees }})</span></dd></div>
        </dl>
      </div>
    </section>

    <!-- Formation -->
    <section class="band formation">
      <div class="wrap">
        <div class="section-head">
          <div><span class="label" appAnim>Formation</span><h2 appAnim="split">Sur les <em>bancs.</em></h2></div>
        </div>
        <div class="forms">
          @for (f of formations; track f.titre; let i = $index) {
            <article appAnim>
              <span class="year">{{ f.periode }}</span>
              <h3>{{ f.titre }}</h3>
              <p class="where mono">{{ f.lieu }}</p>
              <p class="soft">{{ f.description }}</p>
              <div class="chips">@for (t of f.tags; track t) { <span class="chip">{{ t }}</span> }</div>
            </article>
          }
        </div>

        <div class="diplomes" appAnim>
          <span class="label no-dash">Diplômes, brevets & permis</span>
          <ul>
            @for (d of p.diplomes; track d) { <li><ng-icon name="lucideCircleCheck" size="17" /> {{ d }}</li> }
          </ul>
        </div>
      </div>
    </section>

    <!-- Expériences : ligne de route tracée au scroll -->
    <section class="wrap band">
      <div class="section-head">
        <div><span class="label" appAnim>Expériences</span><h2 appAnim="split">Escales <em>professionnelles.</em></h2></div>
        <p class="soft" appAnim>Du plus récent au plus ancien.</p>
      </div>

      <div class="log" #log>
        <div class="route" aria-hidden="true"><span #routeLine class="route-fg"></span></div>
        @for (e of experiences; track e.entreprise + e.periode; let i = $index) {
          <article class="entry" [class.it]="e.it" appAnim>
            <span class="dot"></span>
            <div class="when">
              <span class="mono">LOG {{ e.annee }}</span>
              <strong>{{ e.periode }}</strong>
            </div>
            <div class="what">
              <h3>{{ e.entreprise }}</h3>
              <p class="type">{{ e.type }} @if (e.it) { <span class="badge">Informatique</span> }</p>
              <p class="soft">{{ e.description }}</p>
              <div class="chips">@for (t of e.tags; track t) { <span class="chip">{{ t }}</span> }</div>
            </div>
          </article>
        }
      </div>
    </section>

    <!-- CV -->
    <section class="cv-band">
      <div class="wrap cv">
        <div>
          <span class="label" appAnim>Curriculum vitæ</span>
          <h2 appAnim="split">Mon CV, <em>en un coup d'œil.</em></h2>
          <p appAnim>Consulte et télécharge mon CV pour en savoir plus sur mon parcours, mes compétences et mes projets.</p>
          <div class="cta" appAnim="stagger">
            <a class="btn solid" [href]="p.cv" download appMagnetic>Télécharger <ng-icon name="lucideDownload" size="17" /></a>
            <a class="btn light" [href]="p.cv" target="_blank" rel="noopener" appMagnetic>Voir en grand <ng-icon name="lucideEye" size="17" /></a>
          </div>
        </div>
        <a class="cv-preview" [href]="p.cv" target="_blank" rel="noopener" appAnim>
          <img [src]="p.cv" alt="Aperçu du CV de Raphaël Billot" width="1414" height="2000" loading="lazy" />
        </a>
      </div>
    </section>
  `,
  styles: `
    .profile { display: grid; grid-template-columns: 340px 1fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
    .portrait { margin: 0; aspect-ratio: 3/4; overflow: hidden; background: var(--paper-2); position: sticky; top: 100px;
      img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; } }
    h2 { font-size: clamp(2.2rem, 5vw, 4rem); margin: 14px 0 24px; }
    .sheet { margin: 36px 0 0; border-top: 1px solid var(--ink); }
    .sheet div { display: grid; grid-template-columns: 140px 1fr; gap: 20px; padding: 16px 0; border-bottom: 1px solid var(--line); }
    dt { font-family: var(--mono); font-size: .75rem; text-transform: uppercase; letter-spacing: .1em; color: var(--red); padding-top: 3px; }
    dd { margin: 0; font-family: var(--serif); font-size: 1.15rem; }
    .mono { font-family: var(--mono); font-size: .8rem; color: var(--mute); }

    .formation { background: var(--card); border-block: 1px solid var(--line); }
    .forms { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); }
    .forms article { background: var(--card); padding: clamp(24px, 3vw, 40px); }
    .year { font-family: var(--serif); font-style: italic; font-size: 1.6rem; color: var(--red); }
    .forms h3 { font-size: 1.8rem; margin: 12px 0 4px; }
    .where { margin-bottom: 16px; }
    .diplomes { margin-top: 40px; display: grid; grid-template-columns: 240px 1fr; gap: 24px; align-items: start; }
    .diplomes ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
    .diplomes li { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid var(--line); background: var(--paper); font-weight: 500;
      ng-icon { color: var(--sea); } }

    .log { position: relative; padding-left: 0; }
    .route { position: absolute; left: 199px; top: 0; bottom: 0; width: 2px;
      background: repeating-linear-gradient(var(--line) 0 4px, transparent 4px 10px); }
    .route-fg { position: absolute; inset: 0; background: var(--red); transform-origin: top; transform: scaleY(0); }
    .entry { position: relative; display: grid; grid-template-columns: 180px 1fr; gap: 0 56px; padding: 0 0 56px; }
    .dot { position: absolute; left: 193px; top: 6px; width: 14px; height: 14px; border-radius: 50%; background: var(--paper); border: 2px solid var(--ink); z-index: 1; }
    .entry.it .dot { background: var(--red); border-color: var(--red); box-shadow: 0 0 0 6px rgba(210,56,44,.15); }
    .when { text-align: right; padding-right: 8px; strong { display: block; font-family: var(--serif); font-weight: 500; font-size: 1.1rem; margin-top: 4px; } .mono { color: var(--red); } }
    .what h3 { font-size: clamp(1.5rem, 3vw, 2.2rem); margin-bottom: 4px; }
    .type { font-weight: 600; color: var(--ink-2); display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .badge { font-family: var(--mono); font-size: .68rem; text-transform: uppercase; letter-spacing: .08em; background: var(--red); color: var(--paper); padding: 2px 8px; }

    .cv-band { background: var(--ink); color: var(--paper); padding-block: clamp(64px, 10vw, 120px); }
    .cv { display: grid; grid-template-columns: 1fr 0.8fr; gap: clamp(32px, 6vw, 96px); align-items: center;
      h2 em { color: var(--yellow); } p { opacity: .8; max-width: 44ch; } .label { color: rgba(244,240,230,.6); } }
    .cta { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
    .btn.light { --fg: var(--paper); border-color: var(--paper); &::after { background: var(--paper); } &:hover { color: var(--ink); } }
    .btn.solid { --bg: var(--paper); --fg: var(--ink); border-color: var(--paper); &:hover { color: var(--paper); } }
    .cv-preview { display: block; transform: rotate(2.5deg); box-shadow: 0 30px 60px -20px rgba(0,0,0,.6); transition: transform .6s var(--ease);
      &:hover { transform: rotate(0) scale(1.02); } img { width: 100%; height: auto; } }

    @media (max-width: 860px) {
      .profile, .cv, .forms, .diplomes { grid-template-columns: 1fr; }
      .portrait { position: static; max-width: 360px; }
      .route { left: 19px; }
      .dot { left: 13px; }
      .entry { grid-template-columns: 1fr; padding-left: 48px; gap: 8px; }
      .when { text-align: left; }
      .sheet div { grid-template-columns: 1fr; gap: 4px; }
    }
  `,
})
export class Parcours {
  protected readonly p = PROFILE;
  protected readonly formations = FORMATIONS;
  protected readonly experiences = EXPERIENCES;
  private readonly log = viewChild.required<ElementRef<HTMLElement>>('log');
  private readonly routeLine = viewChild.required<ElementRef<HTMLElement>>('routeLine');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const line = this.routeLine().nativeElement;
      if (reducedMotion()) {
        gsap.set(line, { scaleY: 1 });
        return;
      }
      // la ligne de route se trace au fil du défilement (ScrollTrigger + scrub)
      const tween = gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: this.log().nativeElement, start: 'top 70%', end: 'bottom 70%', scrub: true, invalidateOnRefresh: true },
      });
      destroyRef.onDestroy(() => { tween.scrollTrigger?.kill(); tween.kill(); });
    });
  }
}
