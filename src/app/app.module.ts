import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminPanelHeaderComponent } from './components/admin-panel/admin-panel-header/admin-panel-header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BlogSearchPipe } from './pipes/blog-search.pipe';
import { CategorySearchPipe } from './pipes/category-search.pipe';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RightRailComponent } from './components/right-rail/right-rail.component';
import { LeftRailComponent } from './components/left-rail/left-rail.component';
import { CenterComponent } from './components/center/center.component';
import { CenterDetailsComponent } from './components/center-details/center-details.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { PublicComponent } from './components/public/public.component';
import { SignupComponent } from './components/signup/signup.component';
import { ModalComponent } from './components/modal/modal.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DemoMaterialModule } from './material.module';
import { UsersComponent } from './components/users/users.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogEditPageComponent } from './components/blog-edit-page/blog-edit-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RightRailComponent,
    LeftRailComponent,
    CenterComponent,
    CenterDetailsComponent,
    LoginComponent,
    PublicComponent,
    SignupComponent,
    ModalComponent,
    CategoriesComponent,
    AdminPanelComponent,
    AdminPanelHeaderComponent,
    UsersComponent,
    BlogsComponent,
    BlogEditPageComponent,
    BlogSearchPipe,
    CategorySearchPipe
  ],
  imports: [
    // BrowserModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule, BrowserAnimationsModule,
    Ng2SmartTableModule,
    MatNativeDateModule, DemoMaterialModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
