import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../service/loan.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.scss'],
})
export class AddloanComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'Save';
  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddloanComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      PaymentId: ['', Validators.required],
      CustomerId: ['', Validators.required],
      CustomerName: ['', Validators.required],
      Amount: ['', Validators.required],
      Tax: ['', Validators.required],
      Mode: ['', Validators.required],
      Date: ['', Validators.required],
      Notes: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'update';
      this.productForm.controls['PaymentId'].setValue(this.editData.PaymentId);
      this.productForm.controls['CustomerId'].setValue(
        this.editData.CustomerId
      );
      this.productForm.controls['CustomerName'].setValue(
        this.editData.CustomerName
      );
      this.productForm.controls['Amount'].setValue(this.editData.Amount);
      this.productForm.controls['Tax'].setValue(this.editData.Tax);
      this.productForm.controls['Mode'].setValue(this.editData.Mode);
      this.productForm.controls['Date'].setValue(this.editData.Date);
      this.productForm.controls['Notes'].setValue(this.editData.Notes);
    }
    console.log(this.editData);
  }
  AddLoan() {
    console.log(this.productForm.value);
    if (!this.editData) {
      if (this.productForm.valid) {
        this.loanService.loanProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('adedd');
          },
          error: () => {
            alert('error');
          },
        });
      }
    } else {
      this.updateData();
    }
  }
  updateData() {
    this.loanService.put(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Update successfully!');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('error');
      },
    });
  }
}
