import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition, EventDetails } from '../interfaces/interfaces';

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

  getEventDetails(eventId:string){
    return this._http.get<EventDetails>(`/consoleApi/event/details/${eventId}`)
  }

  addEventPartiipant(coachId:string,teamId:string,eventId:string, participantId:string,raceId:string){
    return this._http.post<any>(`/consoleApi/event/details/${eventId}`,{data:{race:raceId}})
  }
}
