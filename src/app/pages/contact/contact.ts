import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { PROFILE } from '../../data/portfolio';
import { AnimDirective } from '../../shared/anim.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { PageHero } from '../../shared/page-hero';

@Component({
  selector: 'app-contact',
  imports: [PageHero, NgIcon, ReactiveFormsModule, AnimDirective, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero num="06" label="Contact" flag="K" title="N'hésite pas à" titleEm="m'écrire."
      [intro]="p.disponibilite + '. ' + p.reponse" />

    <section class="wrap band grid">
      <ul class="lines">
        <li appAnim>
          <span class="label no-dash">Téléphone</span>
          <a [href]="p.telephoneHref">{{ p.telephone }}</a>
        </li>
        <li appAnim>
          <span class="label no-dash">E-mail</span>
          <a [href]="'mailto:' + p.email">{{ p.email }}</a>
          <button class="copy" (click)="copy()" [attr.aria-label]="'Copier ' + p.email">
            <ng-icon [name]="copied() ? 'lucideCheck' : 'lucideCopy'" size="16" /> {{ copied() ? 'Copié' : 'Copier' }}
          </button>
        </li>
        <li appAnim>
          <span class="label no-dash">LinkedIn</span>
          <a [href]="p.linkedin" target="_blank" rel="noopener">{{ p.prenom }} {{ p.nom }} ↗</a>
        </li>
        <li appAnim>
          <span class="label no-dash">Position</span>
          <span class="static">{{ p.ville }}</span>
        </li>
      </ul>

      <form [formGroup]="form" (ngSubmit)="send()" novalidate appAnim>
        <h2>Envoie-moi <em>un message.</em></h2>
        <label><span>Nom</span><input formControlName="nom" autocomplete="name" placeholder="Ton nom" /></label>
        <label><span>E-mail</span><input formControlName="email" type="email" autocomplete="email" placeholder="toi@exemple.com" /></label>
        <label><span>Message</span><textarea formControlName="message" rows="5" placeholder="Stage, alternance, projet…"></textarea></label>
        @if (submitted() && form.invalid) {
          <p class="error">Merci d'indiquer ton nom, un e-mail valide et un message (10 caractères minimum).</p>
        }
        <button class="btn solid" type="submit" appMagnetic>Envoyer le message <ng-icon name="lucideSend" size="16" /></button>
        <p class="note">Le bouton ouvre ta messagerie avec le message pré-rempli — aucune donnée n'est stockée sur ce site.</p>
      </form>
    </section>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
    .lines { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--ink); }
    .lines li { position: relative; padding: 24px 0; border-bottom: 1px solid var(--line); }
    .lines a, .static { display: block; width: fit-content; margin-top: 6px; font-family: var(--serif); font-size: clamp(1.4rem, 2.8vw, 2.2rem); text-decoration: none;
      background: linear-gradient(var(--red), var(--red)) 0 100% / 0 2px no-repeat; transition: background-size .5s var(--ease), color .3s; word-break: break-word; }
    .lines a:hover { background-size: 100% 2px; color: var(--red); }
    .copy { position: absolute; right: 0; top: 24px; display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--line); background: var(--card);
      padding: 6px 12px; border-radius: 999px; font: 500 .8rem var(--sans); color: var(--ink-2); cursor: pointer; }
    .copy:hover { border-color: var(--ink); }
    form { display: grid; gap: 22px; padding: clamp(24px, 4vw, 44px); background: var(--card); border: 1px solid var(--line); }
    h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); margin: 0 0 6px; }
    label { display: grid; gap: 6px; }
    label span { font-family: var(--mono); font-size: .72rem; text-transform: uppercase; letter-spacing: .1em; color: var(--mute); }
    input, textarea { font: inherit; font-size: 1.05rem; color: var(--ink); background: transparent; border: 0; border-bottom: 1.5px solid var(--line);
      padding: 10px 0; resize: vertical; transition: border-color .3s; }
    input:focus, textarea:focus { outline: none; border-color: var(--ink); }
    input::placeholder, textarea::placeholder { color: var(--mute); opacity: .6; }
    .ng-invalid.ng-touched { border-color: var(--red); }
    .error { color: var(--red); font-size: .9rem; margin: 0; }
    button[type=submit] { justify-self: start; }
    .note { font-size: .82rem; color: var(--mute); margin: 0; }
    @media (max-width: 860px) { .grid { grid-template-columns: 1fr; } .copy { position: static; margin-top: 12px; } }
  `,
})
export class Contact {
  protected readonly p = PROFILE;
  protected readonly copied = signal(false);
  protected readonly submitted = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected send() {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const { nom, email, message } = this.form.getRawValue();
    const body = `${message}\n\n— ${nom} (${email})`;
    location.href = `mailto:${this.p.email}?subject=${encodeURIComponent('Contact depuis le portfolio')}&body=${encodeURIComponent(body)}`;
  }

  protected async copy() {
    try {
      await navigator.clipboard.writeText(this.p.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {}
  }
}
