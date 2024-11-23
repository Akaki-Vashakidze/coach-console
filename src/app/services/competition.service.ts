import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventDetails } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private _http:HttpClient) { }

  getEventDetails(eventId:string){
    return this._http.get<EventDetails>(`/consoleApi/event/details/${eventId}`)
  }
}
