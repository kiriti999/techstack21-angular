import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  loginError: string;
  user: any = {};

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _loginService: LoginService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this._loginService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._loginService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  // googleLogin() {
  //   // this.document.location.href = './auth/google';
  //   this.user = this._loginService.googleLogin();
  //   if (this.user.role == "ROLE_ADMIN") {
  //     localStorage.setItem('loggedIn', JSON.stringify(true));
  //     // this._globalLoginService.update(true);
  //   }
  // }

  // login(username: HTMLInputElement, password: HTMLInputElement) {
  //   this._loginService.login(username.value, password.value).subscribe((res: any) => {
  //     console.log('login res ', res);
  //     this.loginError = res.msg;
  //   })
  // }

}
