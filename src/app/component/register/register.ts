import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {

  private FB=inject(FormBuilder)
  private router=inject(Router)

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
    if(this.RegisterForm.invalid) return;
    console.log("you've succesfully signed up with the following details : ",this.RegisterForm.value);
    this.router.navigateByUrl('/login');
    
  }
}
