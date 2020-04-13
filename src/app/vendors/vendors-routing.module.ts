import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: VendorListComponent
      },
      {
        path: ':id',
        component: VendorDetailComponent
      }
    ],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule {}
