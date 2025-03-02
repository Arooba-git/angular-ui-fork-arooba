import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/auth/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '@shared/loader/service/loader.service';

import { CustomValidators } from '@shared/helper/validators/custom-validators';
import { SignupResult } from '@shared/auth/model/signup-result';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public form: FormGroup;
  public invalid: boolean;
  public signUpError: string;
  public closeResult = {
    success: false
  } as SignupResult;
  public email_subscription = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder
  ) {}

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: ['', Validators.compose([Validators.required, CustomValidators.patternValidator(/^[\S]+$/, { noSpace: true })])],
        password: [
          '',
          Validators.compose([
            Validators.minLength(8),
            Validators.required,
            CustomValidators.patternValidator(/\d/, { digit: true }),
            CustomValidators.patternValidator(/[A-Z]/, {
              upperCase: true
            }),
            CustomValidators.patternValidator(/[a-z]/, { lowerCase: true }),
            CustomValidators.patternValidator(/\W/, { specialChar: true })
          ])
        ],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])]
      },
      {
        validators: CustomValidators.mustMatch('password', 'confirmPassword')
      }
    );
  }

  public signUp(): void {
    if (this.form.invalid) {
      return;
    }

    this.loaderService.show();

    this.invalid = false;

    this.authService
      .signUp(
        this.formControls.username.value,
        this.formControls.password.value,
        this.formControls.email.value,
        this.email_subscription ? '1' : '0'
      )
      .then(() => {
        this.router.navigate(['/login'], { queryParams: { username: this.formControls.username.value } });
      })
      .catch((result) => {
        switch (result.payload.code) {
          case 'UsernameExistsException':
            this.signUpError = 'Eine Nutzer*in mit diesem Namen existiert bereits. Verwende bitte einen anderen Namen.';
            break;
          default:
            this.signUpError = 'Leider ist bei der Registrierung etwas schief gelaufen. Versuche es später erneut.';
            break;
        }

        this.invalid = true;
      })
      .finally(() => this.loaderService.hide());
  }

  getErrorMessagePassword() {
    if (this.formControls.password.hasError('required')) {
      return 'Bitte gib hier dein gewünschtes Passwort ein.';
    }

    if (this.formControls.password.hasError('minlength')) {
      return 'Dein Passwort muss mindestens 8 Zeichen enthalten';
    }

    if (this.formControls.password.hasError('digit')) {
      return 'Dein Passwort muss mindestens eine Ziffer enthalten';
    }

    if (this.formControls.password.hasError('upperCase')) {
      return 'Dein Passwort muss mindestens einen Großbuchstaben enthalten';
    }

    if (this.formControls.password.hasError('lowerCase')) {
      return 'Dein Passwort muss mindestens einen Kleinbuchstaben enthalten';
    }

    return this.formControls.password.hasError('specialChar') ? 'Dein Passwort muss mindestens ein Sonderzeichen enthalten' : '';
  }

  getErrorMessageUser() {
    if (this.formControls.username.hasError('required')) {
      return 'Bitte gib hier deinen gewünschten Anmeldenamen ein.';
    }
    return this.formControls.username.hasError('noSpace') ? 'Dein Anmeldename darf keine Leerzeichen enthalten' : 'Ungültiger Anmeldename';
  }
}
