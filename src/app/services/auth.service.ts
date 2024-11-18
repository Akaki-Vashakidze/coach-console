

import { Injectable } from '@angular/core';
import { LoginInfo, MandatoryPass, PidOrMail, RecPassObj, Session, SubmitTwoFa } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

interface AuthResult { data: { user?: any, uuid?: string, resendDeley?: number, phone?: string } }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session: Session | undefined;
  
  constructor(private _http: HttpClient,) { }



   submit(submitCode: SubmitTwoFa) {
    return this._http.post<{ result: AuthResult }>("/api/session/submit", { data: submitCode }).pipe((map((res: { result: AuthResult }) => {
      if (res?.result?.data?.user) {
        this.session = res?.result?.data as Session;
      }
      return res?.result;
    })))
  }

   retrieveSession() {
    return this._http.get<any>("/api/session").pipe((map((res: { result: AuthResult }) => {
      if (res?.result?.data?.user) {
        this.session = res?.result?.data as Session;
      }
      return res?.result;
    })))
  }

   logout() {
   return this._http.delete<any>("/api/session", {}).pipe(tap(() => {
      localStorage.removeItem('access-token')
    }))
  }

   recoverPasswordinit(info: PidOrMail) {
    return this._http.post('/api/user/recovery/init', { data: info })
  }

   recoverPasswordStart(info:RecPassObj){
    return this._http.post<{uuid:string,resendDeley:number}>('/api/user/recovery/start',info)
  }

   recoverPasswordSubmit(info:SubmitTwoFa){
    return this._http.post('/api/user/recovery/submit',{data:info})
  }

   recoverPasswordMandatoryChange(info:MandatoryPass) {
    return this._http.post('/api/user/password/mandatory/change',info)
  }
}