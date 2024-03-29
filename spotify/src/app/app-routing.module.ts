import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoleGuard } from '@core/guards/admin-role.guard';
import { isLoggedGuard } from '@core/guards/is-logged.guard';
import { sessionGuardFunctional } from '@core/guards/session.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [isLoggedGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [sessionGuardFunctional]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
