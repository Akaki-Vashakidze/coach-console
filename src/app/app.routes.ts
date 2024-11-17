import { Routes } from '@angular/router';
import { SignInComponent } from './components/signIn/sign-in/sign-in.component';
import { SignInConfirmComponent } from './components/signIn/sign-in-confirm/sign-in-confirm.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
      path: '',
    //   canActivate: [userGuard],
    //   runGuardsAndResolvers: 'always',
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
        {
          path: 'dashboard',
          canActivate:[authGuard],
          component: DashboardComponent,
        },
        {
          path: 'auth',
          children:[
            {
                path:'signIn',
                component:SignInComponent
            },
            {
                path:'confirm',
                component:SignInConfirmComponent
            },
          ]
        }
        ]
    },
  ];
