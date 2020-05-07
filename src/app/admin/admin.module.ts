import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MenuComponent } from './menu/menu.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ContentComponent } from './content/content.component';
import { AddModalComponent } from './modal/add-modal/add-modal.component';
import { EditModalComponent } from './modal/edit-modal/edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MenuComponent, AdminLayoutComponent, ContentComponent, AddModalComponent, EditModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
