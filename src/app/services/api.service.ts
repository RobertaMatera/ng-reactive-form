import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private url:string = "http://localhost:3000/productList/"

  constructor( private http: HttpClient ) { }

  postProduct(data: any){
    return this.http.post<any>(this.url, data)
  }

  getProduct(){
    return this.http.get<any>(this.url)
  }
}
