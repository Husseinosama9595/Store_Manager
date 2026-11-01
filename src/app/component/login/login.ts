import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

 private router = inject(Router);

 logInDetails={
  email:"",
  password:""
 }

 
  onSubmit(form: NgForm){
    if(form.valid)
      {
       console.log("form has been submitted and sent to backend ",this.logInDetails);
       this.router.navigateByUrl('/home');
      }
  }



}
