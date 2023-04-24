import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { LoanService } from './service/loan.service';
import { MatTableDataSource } from '@angular/material/table';

export interface Column {
  columnDef: string;
  header: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  getData: any;
  ngOnInit() {}
  constructor(private loanService: LoanService) {
    this.loanService.getData().subscribe((data) => {
      this.getData = data;
    });
  }
}
