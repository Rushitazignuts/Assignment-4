import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoanService } from '../service/loan.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AddloanComponent } from '../addloan/addloan.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent implements OnInit {
  displayedColumns: string[] = [
    'PaymentId',
    'CustomerId',
    'CustomerName',
    'Amount',
    'Tax',
    'Mode',
    'Date',
    'Notes',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private loanService: LoanService, private dialog: MatDialog) {}
  ngOnInit() {
    this.loanService.getLoanData().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
    });
    this.getAll();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    this.dialog
      .open(AddloanComponent, {
        width: '50%',
        height: '60%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getAll();
        }
      });
  }
  getAll() {
    this.loanService.getLoanData().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('error');
      },
    });
  }
  editData(row: any) {
    this.dialog
      .open(AddloanComponent, {
        width: '50%',
        height: '60%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.getAll();
        }
      });
  }
  deleteData(id: number) {
    this.loanService.delete(id).subscribe({
      next: (res) => {
        alert('delete');
        //this.getAll();
      },
      error: () => {
        alert('error');
      },
    });
  }
}
