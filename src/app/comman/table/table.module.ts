import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { ButtonComponent } from '../button/button.component';
@NgModule({
    declarations: [TableComponent,ButtonComponent],
        imports: [
            CommonModule,
        ],
        exports: [TableComponent]
      })
      export class TableModule { }