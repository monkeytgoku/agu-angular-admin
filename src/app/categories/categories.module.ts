import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryDetailComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
