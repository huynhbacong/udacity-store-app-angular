import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { AddOrderResponse } from '../models/addOrderResponse';
import { environment } from 'src/environment';
import { AuthService } from './auth.service';
import { GetOrderResponse, Order } from '../models/getOrderResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.apiUrl;
  headers = new HttpHeaders;
  private orderedProducts: GetOrderResponse = {
    orderId: 0,
    products: [],
    status: 1
  };
  private orderedProducts$ = new BehaviorSubject<GetOrderResponse>(this.orderedProducts);

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.getToken().subscribe(res => {
      this.headers = new HttpHeaders({
        Authorization: 'Bearer ' + res, // Get the token from your authentication service/storage
      });
    })
  }

  setOrderedProducts(data: GetOrderResponse): void {
    this.orderedProducts = data;
    this.orderedProducts$.next(data);
  }

  getOrderedProducts$(): Observable<GetOrderResponse> {
    return this.orderedProducts$.asObservable();
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getOrderedProducts(): Observable<GetOrderResponse> {
    return this.http.get<GetOrderResponse>(`${this.baseUrl}/current-orders`, {
      headers: this.headers,
    });
  }

  addOrder(product: Product): Observable<AddOrderResponse> {
    const res = this.http.post<AddOrderResponse>(
      `${this.baseUrl}/orders/addProduct/${product.id}`,
      { productAmount: product.productAmount },
      { headers: this.headers }
    );

    if (res) {
      this.orderedProducts.products?.push(product);
      this.setOrderedProducts(this.orderedProducts);
    }
    
    return res;
  }

  completeOrder(products: Product[]): Observable<Order> {
    return this.http.post<Order>(
      `${this.baseUrl}/orders/completed`,
      {products: products},
      { headers: this.headers }
    );
  }

  deleteOrderedProduct(productId: number): Observable<boolean> {
    const res = this.http.delete<boolean>(
      `${this.baseUrl}/orders/remove/${productId}`,
      { headers: this.headers });

    if (res) {
      console.log("res", res);
      this.orderedProducts.products = this.orderedProducts.products?.filter(p => p.id != productId);
      this.setOrderedProducts(this.orderedProducts);
    }

    return res;
  }

  reset(): void {
    this.orderedProducts.orderId = 0;
    this.orderedProducts.products = [];
    this.orderedProducts.status = 1;
    this.setOrderedProducts(this.orderedProducts);
  }
}
