import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';



@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class AdminPanelModule { }
