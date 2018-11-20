import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import  { AdminPanelComponent } from './admin-panel.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminPanelComponent]
})
export class AdminPanelModule { }
