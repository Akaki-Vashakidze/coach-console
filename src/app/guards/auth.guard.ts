import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { map, catchError, of } from 'rxjs';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const signInService = inject(SignInService);
  const sessionService = inject(SessionService);

  return signInService.retrieveSession().pipe(
    map(item => {
      if (item?.result?.data?.user) {
        return true;
      } else {
        sessionService.deleteLocalData()
        router.navigate(['/auth/signIn']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/auth/signIn']);
      return of(false);
    })
  );
};
