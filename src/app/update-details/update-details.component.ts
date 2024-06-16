import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedDataService } from '../Services/shared-data.service';
import { Employee } from '../dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-details',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './update-details.component.html',
  styleUrl: './update-details.component.scss'
})
export class UpdateDetailsComponent implements OnInit {
  constructor(private fb: FormBuilder, private shared : SharedDataService, private http : HttpClient) { }
  empDetails : Employee| any = 0;

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
    roleId: [1, Validators.required]
  });

  ngOnInit(): void {
    
  }
  fillPreviousData = () => {
    console.log(this.shared.getEmpDetails());
    this.empDetails = this.shared.getEmpDetails();
  }

  onUpdate() {
    console.log(this.empDetails);
    let url = "https://localhost:7072/api/Employee/Update";
    this.http.put(url,this.empDetails)
    .subscribe((response) => {
      console.log(response);
    });

  }

  onCancel(){
    // this.shared.setEmpDetails(null);
    this.empDetails = 0; 
    this.shared.setUpdateFlag(false);
    this.ngOnInit()
  }
}
