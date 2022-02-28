import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList: Array<string> = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent> ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productFreshness: ['', Validators.required],
      productPrice: ['', Validators.required],
      productComment: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('Product added successfully');
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert('Error while adding the product');
        },
      });
    }
  }
}
