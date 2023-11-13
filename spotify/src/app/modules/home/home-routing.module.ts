import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { adminRoleGuard } from '@core/guards/admin-role.guard';

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      {
        path: 'tracks',
        loadChildren: () => import('@modules/tracks/tracks.module').then(m => m.TracksModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('@modules/favorites/favorites.module').then(m => m.FavoritesModule)
      },
      {
        path: 'history',
        loadChildren: () => import('@modules/history/history.module').then(m => m.HistoryModule)
      },
      {
        path: 'config',
        loadChildren: () => import('@modules/config/config.module').then(m => m.ConfigModule),
        canActivate: [adminRoleGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
