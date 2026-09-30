import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { routes } from './app.routes';
import { APP_ICONS } from './core/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({ skipInitialTransition: true }),
      withInMemoryScrolling({ anchorScrolling: 'enabled' }),
    ),
    provideIcons(APP_ICONS),
  ],
};
