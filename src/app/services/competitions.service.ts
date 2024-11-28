import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition, EventDetails, iTime } from '../interfaces/interfaces';

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

  addEventPartiipant(coachId:string,teamId:string,eventId:string, participantId:string,raceId:string,time:iTime | null){
    return this._http.post<any>(`/consoleApi/coach/${coachId}/teams/${teamId}/events/${eventId}/participant/${participantId}`,{data:{raceId,time}})
  }

  deleteEventPartiipant(coachId:string,teamId:string,eventId:string, participantId:string,raceId:string){
    // ?? todo where is raceId
    return this._http.delete<any>(`/consoleApi/coach/${coachId}/teams/${teamId}/events/${eventId}/participant/${participantId}`)
  }
}
