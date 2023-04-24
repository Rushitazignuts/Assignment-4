import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoanService } from '../service/loan.service';
import { AddcustomerComponent } from '../addcustomer/addcustomer.component';
import { MatDialog } from '@angular/material/dialog';
export interface Column {
  columnDef: string;
  header: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  curr="Customer"
  getCustomerData:any;
  CustomerData:any;
  tableColumns!: Column[];
  
  
  constructor(private loanService: LoanService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.CustomerData=this.loanService.getCustomerData().subscribe((data: any) => {
      
      // this.dataSource = new MatTableDataSource(data);
       
       this.getCustomerData = data;
       console.log(data);
     });
     this.initColumns();
  }
  initColumns(): void {
    this.tableColumns = [
      {
            columnDef: 'firstName',
            header: 'First Name',
          },
          {
            columnDef: 'lastName',
            header: 'Last Name',
          },
          {
            columnDef: 'loanType',
            header: 'Loan Type',
          },
          {
            columnDef: 'loanAmount',
            header: 'Loan Amount',
          },
          {
            columnDef: 'email',
            header: 'Email',
          },
          {
            columnDef: 'phone',
            header: 'Phone',
          },
          {
            columnDef: 'address',
            header: 'Address',
          },
          {
            columnDef: 'city',
            header: 'City',
          },
          
    ]
  }
  
  // deleteCData(id:number){
  //   if(confirm("are you sure want to Delete ")){
  //     this.loanService.CDelete(id).subscribe({
  //           next: (res) => {
  //             alert('delete');
  //             //this.getAll();
  //           },
  //           error: () => {
  //             alert('error');
  //           },
  //         });
  //   }

  // }
  removeOrder(id:number){
    if(confirm("are you sure want to Delete ")){
      this.loanService.CDelete(id).subscribe({

            next: (res) => {
              alert('delete');
              this.getCustomerData;
            },
            error: () => {
              alert('error');
            },
          });

      
      // this.loanService.CDelete(id).subscribe((data) => {
      //   console.log(id);
      // });

    }
  }
  editData(id:any){
    this.dialog
    .open(AddcustomerComponent, {
      width: '50%',
      height: '50%',
      data: id,
    })
    .afterClosed()
    .subscribe((val) => {
      if (val == 'update') {
      }
    });
  }
}
