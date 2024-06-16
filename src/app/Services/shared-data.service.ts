import { Injectable } from '@angular/core';
import { Employee } from '../dashboard/dashboard.component'
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  empDetails : Employee|null = null;
  updateFlag : boolean = false;
  currUser = {
    role  : 0,
    email : ''
  }
  

  constructor() { }

  setEmpDetails(data : Employee | null){
    this.empDetails = data;
  }

  getEmpDetails() {
    return this.empDetails;
  }

  setUpdateFlag(value : boolean) : void{
    this.updateFlag = value;
  }

  getUpdateFlag () : boolean{
    return this.updateFlag;
  }

  setRole(roleId : number) : void {
    this.currUser.role = roleId;
  }

  getRole() : number{
    return this.currUser.role;
  }

  setEmail (email : string) {
    this.currUser.email = email;
  }

  getEmail ()  {
    return this.currUser.email;
  }




}
