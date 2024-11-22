
import { Route } from '@angular/router';
import { DashboardComponent } from '../../components/shared/dashboard/dashboard.component';
import { CoachComponent } from './coach.component';

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
                component: DashboardComponent
            },
        ]
    }
];

