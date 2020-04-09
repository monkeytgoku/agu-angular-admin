import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
