import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _http: HttpClient) { }

  getAthleteBestResult(raceId:string,athleteId:string){
    console.log(raceId,athleteId)
    return this._http.get<any>(`/consoleApi/????????`);
  }

}
