import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Team, TeamDetails } from '../interfaces/interfaces';
import { tap } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  sessionService = inject(SessionService)
  constructor(private _http: HttpClient) { }

  getCoachTeams(id:string){
    return this._http.get<Team[]>(`/consoleApi/coach/${id}/teams`).pipe(
      tap(item => {
        let teamInfo = localStorage.getItem('lane4CoachChosenTeam');
        if(teamInfo) return;
        localStorage.setItem('lane4CoachChosenTeam',JSON.stringify(item[0]))
      })
    )
  }

  setChosenTeam(team:Team){
   localStorage.setItem('lane4CoachChosenTeam',JSON.stringify(team))
  }

  getChosenTeam(){
   return JSON.parse(localStorage.getItem('lane4CoachChosenTeam') || '');
  }

  getTeamDetails(){
   let teamId = this.getChosenTeam()?._id;
   let userId = this.sessionService.getSessionData().user.userId
   return this._http.get<TeamDetails>(`/consoleApi/coach/${userId}/teams/${teamId}`)
  }
}
