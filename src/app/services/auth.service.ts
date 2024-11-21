

import { Injectable } from '@angular/core';
import { GenericResponce, LoginInfo, PidOrMail, RecPassObj, SessionData, SubmitTwoFa, userInfoForPassChange } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

interface AuthResult { data: { user?: any, uuid?: string, resendDeley?: number, phone?: string } }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session: SessionData | undefined;
  
  constructor(private _http: HttpClient,) { }



   logout() {
   return this._http.delete<any>("/api/session", {}).pipe(tap(() => {
      localStorage.removeItem('access-token')
    }))
  }

   recoverPasswordStart(info:RecPassObj){
    return this._http.post<{uuid:string,resendDeley:number}>('/api/user/recovery/start',info)
  }

   recoverPasswordSubmit(info:SubmitTwoFa){
    return this._http.post('/api/user/recovery/submit',{data:info})
  }

  //  recoverPasswordMandatoryChange(info:MandatoryPass) {
  //   return this._http.post<GenericResponce<userInfoForPassChange>>('/api/user/password/mandatory/change',info)
  // }
}