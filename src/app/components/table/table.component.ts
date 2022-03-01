import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';
import { AddProductComponent } from '../addProduct/addProduct.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'productCategory',
    'date',
    'productFreshness',
    'productPrice',
    'productComment',
    'editDelete',
  ];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() productDataSource!: MatTableDataSource<any>;
  @Output() onSaveBtnClicked = new EventEmitter();

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {}

  editProduct(row: any) {
    this.dialog.open(AddProductComponent, {
      width: '30%',
      data: row
    }).afterClosed()
    .subscribe((value: string) => {
      if (value === 'update') {
        this.onSaveBtnClicked.emit();
      }
    });
  }

  deleteProduct(id: number){
   this.api.deleteProduct(id).subscribe({
     next:(res) => {
       alert("Product deleted successfully! 😃");
       this.onSaveBtnClicked.emit()
     },
     error: () => {
       alert("Error while deleting the product! 😭")
     }
   })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


