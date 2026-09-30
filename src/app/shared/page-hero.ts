import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AnimDirective } from './anim.directive';
import { SignalFlag } from './signal-flag';

/** En-tête éditorial des pages intérieures. */
@Component({
  selector: 'app-page-hero',
  imports: [AnimDirective, SignalFlag],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="wrap">
      <div class="meta">
        <span class="label" appAnim [animNow]="true">{{ num() }} — {{ label() }}</span>
        <app-flag class="wave" [letter]="flag()" [size]="46" appAnim [animNow]="true" [animDelay]="0.2" />
      </div>
      <h1 appAnim="chars" [animNow]="true" [animDelay]="0.1">{{ title() }} @if (titleEm()) { <em>{{ titleEm() }}</em> }</h1>
      <div class="bottom">
        @if (intro()) { <p class="lead" appAnim="split" [animNow]="true" [animDelay]="0.4">{{ intro() }}</p> }
        <ng-content />
      </div>
    </header>
  `,
  styles: `
    :host { display: block; padding-top: 120px; border-bottom: 1px solid var(--line); }
    .meta { display: flex; justify-content: space-between; align-items: center; padding-bottom: 18px; border-bottom: 1px solid var(--line); }
    h1 { font-size: clamp(3.2rem, 10vw, 8.5rem); line-height: .92; letter-spacing: -.04em; margin: clamp(28px, 5vw, 56px) 0 28px; max-width: 12ch; }
    .bottom { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; padding-bottom: clamp(40px, 6vw, 72px); }
    .lead { margin: 0; }
  `,
})
export class PageHero {
  readonly num = input.required<string>();
  readonly label = input.required<string>();
  readonly flag = input('Q');
  readonly title = input.required<string>();
  readonly titleEm = input('');
  readonly intro = input('');
}
