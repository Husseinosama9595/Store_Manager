import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { email, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  private FB=inject(FormBuilder)

get f(){
  return this.RegisterForm.controls
}


  RegisterForm=this.FB.group(
    {
      fullname:[
          "",
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        
      email:[
        "",[
          Validators.email,
          Validators.required
        ]
      ],
      password:[
          "",[
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/),  
            Validators.required,
            Validators.minLength(8)

          ]
        ],
        age:[
          18,
          [
            Validators.required,
            Validators.min(18)
          ]
        ]
        

    }
    

  )


  onsubmit(){
    console.log("you've succesfully signed up with the following details : ",this.RegisterForm.value);
    
  }
}
