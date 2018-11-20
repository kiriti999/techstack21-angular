import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
