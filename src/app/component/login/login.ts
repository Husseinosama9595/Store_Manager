import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

 logInDetails={
  email:"",
  password:""
 }

 
  onSubmit(x:any){
    if(x.valid)
      {
       console.log("form has been submitted and sent to backend ",this.logInDetails);
      }
  }



}
