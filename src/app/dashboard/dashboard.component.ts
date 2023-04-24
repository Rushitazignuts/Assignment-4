import { Component, OnInit } from '@angular/core';
import { LoanService } from '../service/loan.service';

export interface Column {
  columnDef: string;
  header: string;
}
export interface Dashboard {
  id: number;
  name: string;
  type: string;
  payment: string;
  due: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isClick=false

  curr = 'Dashboard';
  getData: any;

  tableData: any;
  tableColumns!: Column[];

  constructor(private loanService: LoanService) {}
  ngOnInit() {
    
   this.tableData= this.loanService.getData().subscribe((data:any)=>{
      this.getData=data;
      
      
    });
    
    this.initColumns();
  }
  // getDashboard(): Dashboard[] {
  //   return  [
  //     {
  //       id: 1,
  //       name: 'Hydrogen',
  //       type: '@twitter',
  //       payment: 'H',
  //       due: 'usa',
  //       status: 'active',
  //     },
  //     {
  //       id: 2,
  //       name: 'Helium',
  //       type: '@twitter',
  //       payment: 'He',
  //       due: 'usa',
  //       status: 'active',
  //     },
  //     {
  //       id: 3,
  //       name: 'Lithium',
  //       type: '@twitter',
  //       payment: 'Li',
  //       due: 'usa',
  //       status: 'active',
  //     },
  //   ];
  // }
  

  initColumns(): void {
    this.tableColumns = [
      {
        columnDef: 'id',
        header: 'Id',
      },
      {
        columnDef: 'name',
        header: 'Name',
      },
      {
        columnDef: 'type',
        header: 'Type',
      },
      {
        columnDef: 'payment',
        header: 'Payment',
      },
      {
        columnDef: 'due',
        header: 'Due',
      },
      {
        columnDef: 'status',
        header: 'Status',
      },
    ];
  }

  deleteData(id:number){
    if (confirm('are you sure want to delete')) {
      this.loanService.deleteData(id).subscribe({
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
// onTableAction(event:any){
//   console.log('event', event)
// }
