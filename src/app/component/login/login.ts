import { Component, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

@Component({
  imports: [FormsModule, RouterLink],
  selector: "app-login",
  styleUrl: "./login.css",
  templateUrl: "./login.html",
})
export class Login {
  private router = inject(Router);

  logInDetails = {
    email: "",
    password: "",
  };


showPassword: boolean = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(
        "form has been submitted and sent to backend ",
        this.logInDetails,
      );
      this.router.navigateByUrl("/home");
    }
  }
}
