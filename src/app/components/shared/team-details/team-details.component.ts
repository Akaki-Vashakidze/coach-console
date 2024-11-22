import { Component, signal } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { TeamDetails } from '../../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatTabsModule],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss'
})
export class TeamDetailsComponent {
  teamDetails = signal<TeamDetails | null>(null)
  constructor(private teamService:TeamService){
    teamService.getTeamDetails().subscribe(item => {
      this.teamDetails.set(item)
    })
  }

}
