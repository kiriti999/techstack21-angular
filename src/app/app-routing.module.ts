import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PublicComponent } from './components/public/public.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: PublicComponent},
  { path: 'admin-login', component: LoginComponent },
  { path: 'admin-signup', component: SignupComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'admin-panel/dashboard', component: AdminPanelComponent },
  { path: 'admin-panel/categories', component: CategoriesComponent },
  { path: 'admin-panel/users', component: UsersComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
