import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddloanComponent } from 'src/app/addloan/addloan.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddcustomerComponent } from 'src/app/addcustomer/addcustomer.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
 @Input() icon1! : string;
 @Input() icon2! : string;
  
}
