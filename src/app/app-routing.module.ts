import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PublicComponent } from './components/public/public.component';

const routes: Routes = [
  { path: '', component: PublicComponent,
    children: []
  },
  { path: 'admin-login', component: LoginComponent },
  { path: 'admin-signup', component: SignupComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
