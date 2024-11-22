import { Injectable } from '@angular/core';
import { SessionData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }
  coachSessionData!:SessionData;

  getSessionData(){
    const storedData = localStorage.getItem('lane4CoachSessionData');
    this.coachSessionData = storedData ? JSON.parse(storedData) : null;
    return this.coachSessionData;
  }

  deleteLocalData(){
    localStorage.removeItem('lane4CoachSessionData')
    localStorage.removeItem('access-token')
  }
}
