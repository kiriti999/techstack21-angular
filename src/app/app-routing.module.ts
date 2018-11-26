import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PublicComponent } from './components/public/public.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsersComponent } from './components/users/users.component';
import { BlogEditPageComponent } from './components/blog-edit-page/blog-edit-page.component';

const routes: Routes = [
  { path: '', component: PublicComponent},
  { path: 'home', component: PublicComponent},
  { path: 'javascript', component: PublicComponent},
  { path: 'nodejs', component: PublicComponent},
  { path: 'logout', component: PublicComponent},
  { path: 'admin-login', component: LoginComponent },
  { path: 'admin-signup', component: SignupComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'admin-panel/dashboard', component: AdminPanelComponent },
  { path: 'admin-panel/categories', component: CategoriesComponent },
  { path: 'admin-panel/users', component: UsersComponent },
  { path: 'admin-panel/blogs', component: BlogsComponent },
  { path: 'admin-panel/blog-edit-page', component: BlogEditPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
