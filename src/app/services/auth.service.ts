import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalLoginService } from '../shared-services/global-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private googleLoginUrl = './auth/google';
  private isUserLogin = './auth/isUserLogin';
  private signupUrl = './auth/signup';
  private loginUrl = './auth/login';
  private logoutUrl = './auth/logout';

  constructor(private http: HttpClient, private _globalLoginService: GlobalLoginService) { }

  login(email: string, password: string) {
    
    return this.http.post<any>(this.loginUrl, { email, password: (window.btoa(password)) })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));

                this._globalLoginService.update(true);
            }
              return user;
          }));
  }

  signup(email: string, password: string) {
    
    return this.http.post<any>(this.signupUrl, { email, password: (window.btoa(password)) })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              this._globalLoginService.update(true);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
              return user;
          }));
  }

  isLogin() {
    return this.http.get(this.isUserLogin);
  }

  logout() {
    return this.http.get(this.logoutUrl);
  }

}
