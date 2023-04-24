import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
//import { TableModule }  from '@comman/table/table.module';
import { TableModule }  from '../comman/table/table.module'
@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        TableModule
      ]
    })
    export class DashboardModule { }