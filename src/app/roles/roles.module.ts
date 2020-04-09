import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RolesRoutingModule } from './roles-routing.module';

@NgModule({
  declarations: [RoleListComponent, RoleDetailComponent],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
