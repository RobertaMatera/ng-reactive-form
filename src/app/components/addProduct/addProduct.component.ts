import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addProduct',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.scss'],
})
export class AddProductComponent implements OnInit {
  freshnessList: Array<string> = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      productFreshness: ['', Validators.required],
      productPrice: ['', Validators.required],
      productComment: ['', Validators.required],
      date: ['', Validators.required],
    });

    console.log(this.editData)

    if (this.editData) {
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['productCategory'].setValue(this.editData.productCategory)
      this.productForm.controls['productFreshness'].setValue(this.editData.productFreshness)
      this.productForm.controls['productPrice'].setValue(this.editData.productPrice)
      this.productForm.controls['productComment'].setValue(this.editData.productComment)
      this.productForm.controls['date'].setValue(this.editData.date)
    }
  }

  addProduct() {
    if (!this.editData) {
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
        })
      } else {
        this.updateProduct()
      }
    }
  }

  updateProduct(){
    this.api.putProduct(this.editData.id, this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert("Product updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record!");
      }
    })
  }

  closeAddProductDialog(){
    this.dialogRef.close();
  }
}
