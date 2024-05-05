import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptors,
  HttpBackend,
} from '@angular/common/http';
import {
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
  withRouterConfig,
  provideRouter,
} from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { routes } from './app.routes';

const MultiFileTranslateLoader = (
  http: HttpBackend
): MultiTranslateHttpLoader => new MultiTranslateHttpLoader(http, []);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload',
      }),
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(withInterceptors([])),
    importProvidersFrom(
      MatDatepickerModule,
      MatNativeDateModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: MultiFileTranslateLoader,
          deps: [HttpBackend],
        },
      })
    ),
  ],
};
