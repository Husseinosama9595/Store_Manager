import { Component, inject } from "@angular/core";
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  imports: [ReactiveFormsModule],
  selector: "app-register",
  styleUrl: "./register.css",
  templateUrl: "./register.html",
})
export class Register {
  private FB = inject(FormBuilder);
  private router = inject(Router);

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  };
  get f() {
    return this.RegisterForm.controls;
  }

  RegisterForm = this.FB.group(
    {
      fullname: [
        "",
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      email: [
        "",
        [
          Validators.email,
          Validators.required
        ]
      ],

      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/)
        ]
      ],

      confirmPassword: [
        "",
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],

      age: [
        18,
        [
          Validators.required,
          Validators.min(18)
        ]
      ],
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  onsubmit() {
    if (this.RegisterForm.invalid) return;
    console.log(
      "you've succesfully signed up with the following details : ",
      this.RegisterForm.value,
    );
    this.router.navigateByUrl("/login");
  }
}
