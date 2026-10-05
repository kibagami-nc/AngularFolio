import { Injectable, signal } from '@angular/core';
import { reducedMotion } from './motion';

export type ThemeMode = 'light' | 'dark';

const KEY = 'theme';

/**
 * Thème clair / sombre. Le choix initial (préférence enregistrée ou réglage
 * du système) est appliqué par le script inline de index.html pour éviter
 * un flash au chargement ; ce service se contente de le relire.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  readonly mode = signal<ThemeMode>(document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light');

  /** Bascule le thème, avec un dévoilement circulaire depuis (x, y) si possible. */
  toggle(x = innerWidth / 2, y = 0) {
    const next: ThemeMode = this.mode() === 'dark' ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.dataset['theme'] = next;
      this.mode.set(next);
      try {
        localStorage.setItem(KEY, next);
      } catch {}
    };

    if (!document.startViewTransition || reducedMotion()) return apply();

    const root = document.documentElement;
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.classList.add('vt-theme');
    document.startViewTransition(apply).finished.finally(() => root.classList.remove('vt-theme'));
  }
}
