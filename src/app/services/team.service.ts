import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Team, TeamDetails, User } from '../interfaces/interfaces';
import { tap } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  sessionService = inject(SessionService)
  chosenTeam!: any;
  constructor(private _http: HttpClient) {
    let chosen = localStorage.getItem('lane4ChosenTeam')
    chosen ? this.chosenTeam = JSON.parse(chosen) : '';
  }

  getCoachTeams(id: string) {
    return this._http.get<Team[]>(`/consoleApi/coach/${id}/teams`).pipe(
      tap(item => {
        if (!this.chosenTeam) {
          localStorage.setItem('lane4ChosenTeam',JSON.stringify(item[0]))
          this.chosenTeam = item[0]
        }
      })
    )
  }

  setChosenTeam(team: Team) {
    localStorage.setItem('lane4ChosenTeam',JSON.stringify(team))
    this.chosenTeam = team;
  }

  getChosenTeam() {
    console.log(this.chosenTeam)
    return this.chosenTeam;
  }

  getTeamDetails() {
    let teamId = this.getChosenTeam()?._id;
    let userId = this.sessionService.userId
    return this._http.get<TeamDetails>(`/consoleApi/coach/${userId}/teams/${teamId}`)
  }
}
