import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: []
  },
  {
    path: 'role',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
    canActivate: []
  },
  {
    path: 'category',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    canActivate: []
  },
  {
    path: 'vendor',
    loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule),
    canActivate: []
  },
  {
    path: 'product',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: []
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
