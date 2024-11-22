import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private _http: HttpClient) { }

  getTeamCompetitions(teamId:string, coachId:string){
    console.log(teamId,coachId)
    return this._http.get<any>(`/consoleApi/coach/${coachId}/teams/${teamId}/events`);
  }

}
