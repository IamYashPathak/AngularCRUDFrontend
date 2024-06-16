import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedDataService } from '../Services/shared-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  credInvalid = false;
  constructor(private fb : FormBuilder, private http : HttpClient, private route : Router,
    private shared : SharedDataService
  ) {}

  loginForm = this.fb.group({
    email : ['',Validators.required],
    password : ['',Validators.required]
  });

  onSubmit(){
    // console.log('Creds',this.loginForm.value);  
    this.http.post('https://localhost:7072/api/Login/login',this.loginForm.value)
    .subscribe((response : any)=>{
      console.log(response);
      sessionStorage.setItem('token',response.token);
      this.shared.setRole(response.role);
      this.shared.setEmail(response.email);
      this.route.navigateByUrl('/dashboard');
    });
  }
}
