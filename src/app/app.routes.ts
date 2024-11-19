import { Routes } from '@angular/router';
import { SignInComponent } from './components/signIn/sign-in/sign-in.component';
import { SignInConfirmComponent } from './components/signIn/sign-in-confirm/sign-in-confirm.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { RecoveryUserIdComponent } from './components/signIn/recovery-user-id/recovery-user-id.component';
import { RecoveryContactComponent } from './components/signIn/recovery-contact/recovery-contact.component';
import { NewPassRecoveryComponent } from './components/signIn/new-pass-recovery/new-pass-recovery.component';

export const routes: Routes = [
  {
    path: '',
    //   canActivate: [userGuard],
    //   runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        component: DashboardComponent,
      },
      {
        path: 'auth',
        children: [
          {
            path: '',
            redirectTo: 'signIn',
            pathMatch: 'full',
          },
          {
            path: 'signIn',
            component: SignInComponent
          },
          {
            path: 'confirm',
            component: SignInConfirmComponent
          },
          {
            path: 'recovery1',
            component: RecoveryUserIdComponent
          },
          {
            path: 'recovery2',
            component: RecoveryContactComponent
          },
          {
            path: 'newPass',
            component: NewPassRecoveryComponent
          },
        ]
      }
    ]
  },
];
