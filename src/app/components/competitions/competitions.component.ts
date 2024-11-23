import { Component, signal } from '@angular/core';
import { CompetitionsService } from '../../services/competitions.service';
import { TeamService } from '../../services/team.service';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from '../shared/loader-spinner/loader-spinner.component';
import { Competition } from '../../interfaces/interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CommonModule, LoaderSpinnerComponent, MatCardModule, MatButtonModule],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.scss'
})
export class CompetitionsComponent {
  competitions = signal<Competition[] | null>(null);
  constructor(private competitionService:CompetitionsService,private teamService:TeamService, private sessionService:SessionService){
    let chosenTeam = teamService.getChosenTeam()
    let teamId = chosenTeam._id
    competitionService.getTeamCompetitions(teamId,sessionService.userId).subscribe(item => {
      this.competitions.set(item)
    })
  }

  canRegistrate(regEndDate: Date): boolean {
    const today = new Date();
    const endDate = new Date(regEndDate);
  
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
    if (todayDateOnly.getTime() === endDateOnly.getTime()) {
      return true; 
    }
  
    if (todayDateOnly.getTime() > endDateOnly.getTime()) {
      return false;
    }
  
    return true;
  }
}
