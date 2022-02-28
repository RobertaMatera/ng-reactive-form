import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList: Array<string>= ["Brand New", "Second Hand", "Refurbished"]
  productForm!: FormGroup;


  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: [ '', Validators.required ],
      productCategory: [ '', Validators.required ],
      productFreshness: [ '', Validators.required ],
      productPrice: [ '', Validators.required ],
      productComment: [ '', Validators.required ],
      date: [ '', Validators.required ]
    })
  }

  addProduct(){
    console.log(this.productForm.value)
  }
}
