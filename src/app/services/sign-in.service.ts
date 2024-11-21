import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GenericResponce, LoginInfo, PidOrMail, RecPassStart, SessionData, SubmitTwoFa, SuccessfulPassChangeDataRes, userInfoForPassChange } from '../interfaces/interfaces';

interface AuthResult { data: SessionData }

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  session: SessionData | undefined;
  constructor(private _http: HttpClient) { }

  login(loginInfo: LoginInfo) {
    return this._http.post<{ result: AuthResult }>("/consoleApi/session/admin", { data: loginInfo }).pipe(map((res: { result: AuthResult }) => {
      if (res?.result?.data?.user) {
        this.session = res?.result?.data as SessionData;
      }
      return res?.result;
    }))
  }

  retrieveSession() {
    return this._http.get<any>("/consoleApi/session")
  }

  recoverPasswordinit(info: PidOrMail) {
    return this._http.post<any>('/consoleApi/user/recovery/init', { data: info })
  }

  recoverPasswordStart(data:any){
    return this._http.post<{uuid:string,resendDeley:number}>('/consoleApi/user/recovery/start',{data})
  }

  recoverPasswordSubmit(info:SubmitTwoFa){
    return this._http.post<GenericResponce<userInfoForPassChange>>('/consoleApi/user/recovery/submit',{data:info})
  }

  recoverPasswordMandatoryChange(password:string) {
    return this._http.post<GenericResponce<SuccessfulPassChangeDataRes>>('/consoleApi/user/password/mandatory/change',{data:{password}})
  }
}
