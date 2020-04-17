import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent, UserNewComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
