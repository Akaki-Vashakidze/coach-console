import { Component } from '@angular/core';
import { CompetitionsService } from '../../services/competitions.service';
import { TeamService } from '../../services/team.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.scss'
})
export class CompetitionsComponent {
  constructor(private competitionService:CompetitionsService,private teamService:TeamService, private sessionService:SessionService){
    competitionService.getTeamCompetitions(teamService.getChosenTeam()?._id,sessionService.getSessionData()?.user?.userId).subscribe(item => {
      console.log(item)
    })
  }
}
