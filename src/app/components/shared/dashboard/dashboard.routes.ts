
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CompetitionsComponent } from '../../competitions/competitions.component';
import { TeamsComponent } from '../../teams/teams.component';

export const dashRoutes: Route[] = [
    {
        component: DashboardComponent,
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'teams',
                pathMatch: 'full',
            },
            {
                path: 'teams',
                component: TeamsComponent
            },
            {
                path: 'competitions',
                component: CompetitionsComponent
            },
        ]
    }
];