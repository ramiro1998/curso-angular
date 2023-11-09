import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false
  formLogin: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private authService: AuthService, private cookie: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new UntypedFormGroup(
      {
        email: new UntypedFormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new UntypedFormControl('',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      }
    )
    this.formLogin.get('email')?.valueChanges.subscribe((mail) => { console.log('cambbiando maill', mail); this.errorSession = false });
    this.formLogin.get('password')?.valueChanges.subscribe((pass) => { console.log('cambbiando contraseña', pass); this.errorSession = false });
  }

  // sendLogin(): void {
  //   const { email, password } = this.formLogin.value
  //   this.authService.sendCredentials(email, password)
  //     //TODO: 200 <400
  //     .subscribe(responseOk => { //TODO: Cuando el usuario credenciales Correctas ✔✔
  //       console.log('Session iniciada correcta', responseOk);
  //       const { tokenSession, data } = responseOk
  //       this.cookie.set('token', tokenSession, 4, '/') //TODO:📌📌📌📌
  //       this.router.navigate(['/', 'tracks'])
  //     },
  //       err => {//TODO error 400>=
  //         this.errorSession = true
  //         console.log('⚠⚠⚠⚠Ocurrio error con tu email o password', err);
  //       })

  // }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;
    this.authService.sendCredentials(email, password)
      .subscribe(
        responseOk => {
          console.log('ok?', responseOk)
          if (responseOk.tokenSession) {
            const { tokenSession, data } = responseOk;
            this.cookie.set('token', tokenSession, 4, '/');
            this.router.navigate(['/', 'tracks']);  // <-- navigate on success}
          } else {
            this.errorSession = true;
          }
        },
        err => {
          this.errorSession = true;
          console.log('⚠⚠⚠⚠Ocurrio error con tu email o password', err);
          // handle error here, but don't navigate
        }
      );
  }

}