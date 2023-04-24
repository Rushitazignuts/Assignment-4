import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoanService } from '../service/loan.service';

import { AddloanComponent } from '../addloan/addloan.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Column {
  columnDef: string;
  header: string;
}

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnInit {
  curr = 'Loan';
  getLoanData: any;
  tableData: any;
  loanData:any;
  tableColumns!: Column[];
  
  
  // tableColumns: Array<any> = [
  //   {
  //     columnDef: 'PaymentId',
  //     header: 'Payment Id',
  //   },
  //   {
  //     columnDef: 'CustomerId',
  //     header: 'Customer Id',
  //   },
  //   {
  //     columnDef: 'CustomerName',
  //     header: 'Customer Name',
  //   },
  //   {
  //     columnDef: 'Amount',
  //     header: 'Amount',
  //   },
  //   {
  //     columnDef: 'Tax',
  //     header: 'Tax',
  //   },
  //   {
  //     columnDef: 'Mode',
  //     header: 'Mode',
  //   },
    
  // ];

 

//  tableData: any = [
//   { PaymentId: 1, CustomerId: 'Hydrogen', type: 1.0079, payment: 'H' },
//   { PaymentId: 2, CustomerId: 'Helium', type: 4.0026, payment: 'He' },
//   { PaymentId: 3, CustomerId: 'Lithium', type: 6.941, payment: 'Li' },
//   { PaymentId: 4, CustomerId: 'Beryllium', type: 9.0122, payment: 'Be' },
//   { PaymentId: 5, CustomerId: 'Boron', type: 10.811, payment: 'B' },
//   { PaymentId: 6, CustomerId: 'Beryllium', type: 9.0122, payment: 'Be' },
//   { PaymentId: 7, CustomerId: 'Boron', type: 10.811, payment: 'B' },
// ];
  

  
  constructor(private loanService: LoanService, private dialog: MatDialog) {}
  ngOnInit() {
    this.loanData=this.loanService.getLoanData().subscribe((data: any) => {
      
     
      
      this.getLoanData = data;
      console.log(data);
    });
    this.initColumns();
    //this.getAll();
  }
  initColumns(): void {
    this.tableColumns = [
      {
            columnDef: 'PaymentId',
            header: 'Payment Id',
          },
          {
            columnDef: 'CustomerId',
            header: 'Customer Id',
          },
          {
            columnDef: 'CustomerName',
            header: 'Customer Name',
          },
          {
            columnDef: 'Amount',
            header: 'Amount',
          },
          {
            columnDef: 'Tax',
            header: 'Tax',
          },
          {
            columnDef: 'Mode',
            header: 'Mode',
          },
          
    ]
  }
  openDialog() {
    this.dialog
      .open(AddloanComponent, {
        width: '50%',
        height: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          //this.getAll();
        }
      });
  }

  // getAll() {
  //   this.loanService.getLoanData().subscribe({
  //     next: (res) => {
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     error: (err) => {
  //       alert('error');
  //     },
  //   });
  // }

  editData(row: number) {
    this.dialog
      .open(AddloanComponent, {
        width: '50%',
        height: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
         //this.getAll();
        }
      });
  }

  deleteData(id: number) {
    console.log(id);
    
    if (confirm('are you sure want to delete')) {
      this.loanService.deleteLoan(id).subscribe({
        next: (res) => {
          alert('delete');
          
        },
        error: () => {
          alert('error');
        },
      });
    }
  }

  
  
  
 
}
