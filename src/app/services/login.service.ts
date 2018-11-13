import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private googleLoginUrl = './auth/google';
  private isUserLogin = './auth/isUserLogin';
  private loginUrl = './auth/login';
  private logoutUrl = './auth/logout';

  constructor(private http: HttpClient) { }

  googleLogin() {
    // return this.http.get(this.googleLoginUrl);
    return {
      role: "ROLE_ADMIN",
      name: "Kiriti"
    }
  }

  isLogin() {
    return this.http.get(this.isUserLogin);
  }

  login(username, password) {
    return this.http.get(this.loginUrl + `?password=${window.btoa(password)}&username=${username}`);
  }

  logout() {
    return this.http.get(this.logoutUrl);
  }

}
