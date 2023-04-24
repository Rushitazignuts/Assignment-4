import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../dashboard/dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  constructor(private Http: HttpClient) {}
  url = 'http://localhost:3000/post/';
  loanUrl = 'http://localhost:3000/loans/';
  customerUrl = 'http://localhost:3000/Customers/';
  getData() {
    return this.Http.get<any>(this.url);
  }
  deleteData(id:number){
    return this.Http.delete(this.url +id)

  }
  getLoanData() {
    return this.Http.get<any>(this.loanUrl);
  }
  getCustomerData() {
    return this.Http.get<any>(this.customerUrl);
  }
  postcustomerData(data: any) {
    return this.Http.post<any>(this.customerUrl, data);
  }
  loanProduct(data: any) {
    return this.Http.post<any>(this.loanUrl, data);
  }
  put(data: any, id: number) {
    return this.Http.put<any>('http://localhost:3000/loans/' + id, data);
  }
  deleteLoan(id: number) {
    console.log(id);
    
    return this.Http.delete<any>('http://localhost:3000/loans/'+id);
  }
  CDelete(id: number) {
    console.log(id);
    return this.Http.delete<any>('http://localhost:3000/Customers/' + id);
  }



  public get name(){
    return localStorage.getItem('name');
  }
  public set name(value:any){
     localStorage.setItem('name',value);
  }

public get user(){
  return localStorage.getItem('user');
} 
public set user(value:any){
  localStorage.setItem('user',JSON.stringify(value));
}

}
