import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private _http: HttpClient) { }

  getTeamCompetitions(teamId:string, coachId:string){
    return this._http.get<Competition[]>(`/consoleApi/coach/${coachId}/teams/${teamId}/events`);
  }

  getPlannedEvents(){
    return this._http.get<Competition[]>(`/consoleApi/event/planned`);
  }

}
