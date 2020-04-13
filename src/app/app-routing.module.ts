import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ForbiddenComponent } from './core/components/forbidden/forbidden.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

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
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'role',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendor',
    loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule)
    // using canActivateChild
  },
  {
    path: 'product',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
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
