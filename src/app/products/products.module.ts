import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductDetailComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
