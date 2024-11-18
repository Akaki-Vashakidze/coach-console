import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { consoleApiRedirectInterceptor } from './interceptors/console-api-redirect.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './store/user/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(), 
    provideHttpClient(withInterceptors([consoleApiRedirectInterceptor])), 
    provideStore({user:userReducer}), 
    provideEffects([]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
