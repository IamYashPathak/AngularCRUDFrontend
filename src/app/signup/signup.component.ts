import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private fb: FormBuilder, private http: HttpClient, 
    private route : Router
  ) { }

  roles = [
    { id: 1, title: "Admin" },
    { id: 2, title: "Manager" },
    { id: 3, title: "Employee" }
  ]

  isSubmitted = false;

  registerForm = this.fb.group({
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phNo: [null, Validators.required],
    address: ['', Validators.required],
    pincode: [null, Validators.required],
    roleId: [1, Validators.required],
    password : ['',Validators.required]
  });


  onSubmit(): void {
    this.http.post('https://localhost:7072/api/SignUp/Insert', this.registerForm.value) 
      .subscribe((response : any) => {
        console.log(response.message);
      });

    this.isSubmitted = true;
    this.route.navigateByUrl('');
  }

}
