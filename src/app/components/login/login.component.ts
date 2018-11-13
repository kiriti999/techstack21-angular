import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { GlobalLoginService } from '../../shared-services/global-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError: string;
  user: any = {};

  constructor(@Inject(DOCUMENT) private document: any, private _loginService: LoginService, private _globalLoginService : GlobalLoginService) { }

  ngOnInit() {
  }

  googleLogin() {
    // this.document.location.href = './auth/google';
    this.user = this._loginService.googleLogin();
    if(this.user.role == "ROLE_ADMIN") {
      localStorage.setItem('loggedIn', JSON.stringify(true));
      this._globalLoginService.update(true);
    }
  }

  login(username: HTMLInputElement, password: HTMLInputElement) {
    this._loginService.login(username.value, password.value).subscribe((res: any) => {
      console.log('login res ', res);
      this.loginError = res.msg;
    })
  }

}
