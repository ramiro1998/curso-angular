import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ImgBrokenDirective } from '@shared/directives/img-broken.directive';


@NgModule({
  declarations: [
    ConfigPageComponent,
    ImgBrokenDirective
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class ConfigModule { }
