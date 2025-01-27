import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { JWTInterceptor } from './interceptor/jwt.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
     provideHttpClient(),
     importProvidersFrom(
      ToastrModule.forRoot({maxOpened:1,autoDismiss:true, easeTime: 100,}),
      BrowserAnimationsModule,
      HttpClientModule,
      )
    ]
};
