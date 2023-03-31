import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { LoanService } from '../service/loan.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  getData: any;
  searchText = '';

  constructor(private loanService: LoanService) {
    this.loanService.getData().subscribe((data) => {
      console.log(data);
      this.getData = data;
    });
  }
  ngOnInit(): void {}
}
