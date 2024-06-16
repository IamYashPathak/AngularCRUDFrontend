import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { UpdateDetailsComponent } from '../update-details/update-details.component';
import { SharedDataService } from '../Services/shared-data.service';
import { routes } from '../app.routes';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, UpdateDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private http : HttpClient, private shared : SharedDataService ,
    private route : Router
  ){}
  empDetails : Employee[] = [];
  updateFlag = this.shared.getUpdateFlag();
  roles : {[key : number] : string} = {
    1 : 'Admin',
    2 : 'Manager',
    3 : 'Employee'
  }

  // httpClient = inject(HttpClient);

  ngOnInit() {

    if(this.shared.getRole() != 3){
      this.http.get('https://localhost:7072/api/Employee/GetAll')
      .subscribe((response : any) => {
        this.empDetails = response;
  
      });
    }else {
      this.http.get(`https://localhost:7072/api/Employee/GetByEmail/?email=${this.shared.getEmail()}`)
      .subscribe((response : any)  => {
        this.empDetails = [response];
      })
    }
    
  }

  onDelete(userId: number, email : string) {
    console.log(userId);
    
    if (confirm("Are you sure about deleting this record?")) {
        const url = `https://localhost:7072/api/Employee/Delete?userId=${userId}&email=${email}`;
        this.http.delete(url).subscribe(
            (response : any) => {
                console.log("Record deleted successfully",response);
            }
        );
    } else {
      console.log("Data Saved = Opportunity Saved");
    }
  }

  onUpdate = (empDetails :Employee) => {
    this.updateFlag = true;
    this.shared.setEmpDetails(empDetails);
  }

  updateDone = () => {
    this.updateFlag = false;
  }

  onLogout = () => {
    sessionStorage.setItem('token','');
    this.route.navigateByUrl('');
  }

    
}

export class Employee {

  // constructor() {
  //   this.userId = 0;
  // }

  userId : number = 0;
  fName : string = '';
  lName : string = '';
  email : string = '';
  phNo : number = 0;
  address : string = '';
  pincode : number = 0;
  roleId : number = 0;
}
