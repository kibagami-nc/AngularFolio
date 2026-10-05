import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Pavillons du Code international des signaux (A → Z), dessinés en SVG.
 * Utilisés comme repères de section — clin d'œil au métier de timonier.
 */
const R = '#d2382c', Y = '#e9b43b', B = '#1f4f86', W = '#fbf9f3', K = '#101820';

const FLAGS: Record<string, string> = {
  A: `<rect width="30" height="45" fill="${W}"/><path d="M30 0H60L45 22.5 60 45H30z" fill="${B}"/>`,
  B: `<path d="M0 0H60L45 22.5 60 45H0z" fill="${R}"/>`,
  C: `<rect width="60" height="45" fill="${B}"/><rect y="9" width="60" height="27" fill="${W}"/><rect y="18" width="60" height="9" fill="${R}"/>`,
  D: `<rect width="60" height="45" fill="${Y}"/><rect y="11" width="60" height="23" fill="${B}"/>`,
  E: `<rect width="60" height="23" fill="${B}"/><rect y="22.5" width="60" height="22.5" fill="${R}"/>`,
  F: `<rect width="60" height="45" fill="${W}"/><path d="M30 0 60 22.5 30 45 0 22.5z" fill="${R}"/>`,
  G: `<rect width="60" height="45" fill="${B}"/>${[0, 20, 40].map((x) => `<rect x="${x}" width="10" height="45" fill="${Y}"/>`).join('')}`,
  H: `<rect width="30" height="45" fill="${W}"/><rect x="30" width="30" height="45" fill="${R}"/>`,
  I: `<rect width="60" height="45" fill="${Y}"/><circle cx="30" cy="22.5" r="11" fill="${K}"/>`,
  J: `<rect width="60" height="45" fill="${B}"/><rect y="15" width="60" height="15" fill="${W}"/>`,
  K: `<rect width="30" height="45" fill="${Y}"/><rect x="30" width="30" height="45" fill="${B}"/>`,
  L: `<rect width="60" height="45" fill="${Y}"/><rect x="30" width="30" height="22.5" fill="${K}"/><rect y="22.5" width="30" height="22.5" fill="${K}"/>`,
  M: `<rect width="60" height="45" fill="${B}"/><path d="M0 0 60 45M60 0 0 45" stroke="${W}" stroke-width="9"/>`,
  N: `<rect width="60" height="45" fill="${W}"/>${[0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3].filter((c) => (r + c) % 2 === 0).map((c) => `<rect x="${c * 15}" y="${r * 11.25}" width="15" height="11.25" fill="${B}"/>`)).join('')}`,
  O: `<path d="M0 45V0H60z" fill="${R}"/><path d="M0 45H60V0z" fill="${Y}"/>`,
  P: `<rect width="60" height="45" fill="${B}"/><rect x="20" y="15" width="20" height="15" fill="${W}"/>`,
  Q: `<rect width="60" height="45" fill="${Y}"/>`,
  R: `<rect width="60" height="45" fill="${R}"/><rect x="25" width="10" height="45" fill="${Y}"/><rect y="17.5" width="60" height="10" fill="${Y}"/>`,
  S: `<rect width="60" height="45" fill="${W}"/><rect x="20" y="15" width="20" height="15" fill="${B}"/>`,
  T: `<rect width="20" height="45" fill="${R}"/><rect x="20" width="20" height="45" fill="${W}"/><rect x="40" width="20" height="45" fill="${B}"/>`,
  U: `<rect width="60" height="45" fill="${W}"/><rect width="30" height="22.5" fill="${R}"/><rect x="30" y="22.5" width="30" height="22.5" fill="${R}"/>`,
  V: `<rect width="60" height="45" fill="${W}"/><path d="M0 0 60 45M60 0 0 45" stroke="${R}" stroke-width="9"/>`,
  W: `<rect width="60" height="45" fill="${B}"/><rect x="8" y="7" width="44" height="31" fill="${W}"/><rect x="18" y="15" width="24" height="15" fill="${R}"/>`,
  X: `<rect width="60" height="45" fill="${W}"/><rect x="25" width="10" height="45" fill="${B}"/><rect y="17.5" width="60" height="10" fill="${B}"/>`,
  Y: `<rect width="60" height="45" fill="${Y}"/>${[-45, -27, -9, 9, 27, 45].map((x) => `<path d="M${x} 45 ${x + 45} 0h9L${x + 9} 45z" fill="${R}"/>`).join('')}`,
  Z: `<path d="M0 0H60L30 22.5z" fill="${Y}"/><path d="M60 0V45L30 22.5z" fill="${B}"/><path d="M0 45H60L30 22.5z" fill="${R}"/><path d="M0 0V45L30 22.5z" fill="${K}"/>`,
};

@Component({
  selector: 'app-flag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg viewBox="0 0 60 45" [attr.width]="size()" [attr.height]="size() * 0.75" role="img"
    [attr.aria-label]="'Pavillon ' + letter()" [innerHTML]="svg()"></svg>`,
  styles: `
    :host { display: inline-block; line-height: 0; }
    svg { box-shadow: 0 0 0 1px color-mix(in srgb, var(--ink) 18%, transparent); border-radius: 1px; transform-origin: left center; }
    :host(.wave) svg { animation: wave 3.2s ease-in-out infinite; animation-delay: var(--d, 0s); }
    @keyframes wave { 0%,100% { transform: skewY(0) scaleX(1); } 50% { transform: skewY(-4deg) scaleX(.96); } }
    @media (prefers-reduced-motion: reduce) { :host(.wave) svg { animation: none; } }
  `,
})
export class SignalFlag {
  readonly letter = input.required<string>();
  readonly size = input(28);
  private readonly sanitizer = inject(DomSanitizer);
  // SVG statique défini dans ce fichier (aucune donnée utilisateur) : on peut le marquer comme sûr.
  protected readonly svg = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(FLAGS[this.letter().toUpperCase()] ?? FLAGS['Q']),
  );
}
