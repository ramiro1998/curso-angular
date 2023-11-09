import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { authorizationInterceptor } from '@core/interceptors/inject-session.interceptor';
// import { InjectSessionInterceptor } from '@core/interceptors/inject-session.interceptor';

@NgModule({
  declarations: [ //TODO: Declaraciones, componentes, directivas, pipes
    AppComponent,
  ],
  imports: [ //TODO: Solo se importan otros modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  // providers: [
  //   CookieService,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useFactory: authorizationInterceptor,
  //     multi: true
  //   }
  // ],
  providers: [
    provideHttpClient(
      withInterceptors([authorizationInterceptor])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }