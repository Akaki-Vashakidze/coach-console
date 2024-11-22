import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponce, Team } from '../interfaces/interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

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
}
