import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorsRoutingModule } from './vendors-routing.module';

@NgModule({
  declarations: [VendorListComponent, VendorDetailComponent],
  imports: [
    CommonModule,
    VendorsRoutingModule
  ]
})
export class VendorsModule { }
