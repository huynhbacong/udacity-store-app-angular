import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]>  {
    return this.http.get<[]>('https://jsonplaceholder.typicode.com/comments');
  }

  getOrderedProducts(): Observable<Product[]> {
    return this.http.get<[]>('https://jsonplaceholder.typicode.com/comments');
  }

  addOrder() {
    
  }
}
