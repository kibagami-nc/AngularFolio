import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { AnimDirective } from '../../shared/anim.directive';
import { SignalFlag } from '../../shared/signal-flag';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, NgIcon, AnimDirective, SignalFlag],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="wrap">
      <div class="flags" aria-label="Pavillons N-C : navire en détresse">
        <app-flag class="wave" letter="N" [size]="80" /><app-flag class="wave" letter="C" [size]="80" style="--d:.3s" />
      </div>
      <span class="label">Erreur 404 · pavillons N + C : « en détresse »</span>
      <h1 appAnim="chars" [animNow]="true">Hors <em>des cartes.</em></h1>
      <p class="lead">Cette page n'existe pas ou a changé de cap.</p>
      <a class="btn solid" routerLink="/"><ng-icon name="lucideArrowLeft" size="16" /> Retour au port</a>
    </section>
  `,
  styles: `
    section { min-height: 90vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 20px; padding-top: 100px; }
    .flags { display: flex; gap: 10px; }
    h1 { font-size: clamp(3.5rem, 11vw, 9rem); margin: 0; letter-spacing: -.04em; }
  `,
})
export class NotFound {}
