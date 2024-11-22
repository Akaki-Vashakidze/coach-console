
import { Route } from '@angular/router';
import { DashboardComponent } from '../../components/shared/dashboard/dashboard.component';
import { CoachComponent } from './coach.component';
import { TeamDetailsComponent } from '../../components/shared/team-details/team-details.component';

export const coachRoutes: Route[] = [
    {
        component: CoachComponent,
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: () =>
                  import('../../components/shared/dashboard/dashboard.routes').then(
                    ({ dashRoutes }) => dashRoutes
                  ),
            },
            {
                path:'teamDetails',
                component:TeamDetailsComponent
            }
        ]
    }
];

