import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared-services/shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private googleLoginUrl = './auth/google';
  private isUserLogin = './auth/isUserLogin';
  private signupUrl = './auth/signup';
  private loginUrl = './auth/login';
  private logoutUrl = './auth/logout';

  constructor(private http: HttpClient, private _sharedService: SharedService, private router: Router) { }

  login(email: string, password: string) {
    
    return this.http.post<any>(this.loginUrl, { email, password: (window.btoa(password)) })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));

                this._sharedService.update(true);
            }
              return user;
          }));
  }

  signup(email: string, password: string) {
    
    return this.http.post<any>(this.signupUrl, { email, password: (window.btoa(password)) })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              this._sharedService.update(true);
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
    localStorage.removeItem('currentUser');
    this._sharedService.update(false);
    this.router.navigate(['/']);
  }

}
