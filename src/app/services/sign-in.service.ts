import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LoginInfo, Session } from '../interfaces/interfaces';

interface AuthResult { data: { user?: any, uuid?: string, resendDeley?: number, phone?: string } }
@Injectable({
  providedIn: 'root'
})
export class SignInService {
  session: Session | undefined;
  constructor(private _http:HttpClient) { }
     login(loginInfo: LoginInfo) {
    return this._http.post<{ result: AuthResult }>("/console-api/session/admin", { data: loginInfo }).pipe(map((res: { result: AuthResult }) => {
      if (res?.result?.data?.user) {
        this.session = res?.result?.data as Session;
      }
      return res?.result;
    }))
  }
}
