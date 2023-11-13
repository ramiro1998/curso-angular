import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { adminRoleGuard } from '@core/guards/admin-role.guard';

const routes: Routes = [
  {
    path: '', component: ConfigPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
