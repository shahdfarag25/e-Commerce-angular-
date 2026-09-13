import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { MyplatformService } from '../myPlatform/myplatform.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData = new BehaviorSubject(null);
  // userData = signal<User|null>(null); and deal this with effect method
  private httpClient: HttpClient = inject(HttpClient);
  private myplatformService: MyplatformService = inject(MyplatformService);

  // handle the refresh to keep data
  constructor() {
    //handle browser
    if (this.myplatformService.checkPlatformBrowser()) {
      if (localStorage.getItem('userToken')) {
        this.setUserData();
      }
    }
  }
  registerAPI(bodyData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signup`, bodyData);
  }
  loginAPI(bodyData: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/signin`, bodyData);
  }
  setUserData() {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
    } else {
      this.userData.next(null);
    }

    console.log(this.userData.getValue());
  }
  getUserId() {
    const user: any = this.userData.getValue();
    return user ? user.id : null;
  }
  forgetPassword(pEmail: string): Observable<any> {
    //send code to mail
    return this.httpClient.post(`${environment.baseUrl}auth/forgotPasswords`, {
      email: pEmail,
    });
  }
  verifyCode(code: string | null): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}auth/verifyResetCode`, {
      resetCode: code,
    });
  }
  resetPassword(pEmail: string, ePassword: string): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}auth/resetPassword`, {
      email: pEmail,
      newPassword: ePassword,
    });
  }
}
