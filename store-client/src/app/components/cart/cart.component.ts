import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetOrderResponse } from 'src/app/models/getOrderResponse';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        name: 'test',
        price: 10.0,
        category: 1,
        imgsrc:
          'https://m.media-amazon.com/images/I/81PtF30TLUL._AC_UY1100_.jpg',
      } as Product,
    ];

    if (!this.authService.getToken()) {
      this.authService.isCartRouter = true;
      this.router.navigate(['/']);
      this.authService.isCartRouter = true;
      return;
    }

    this.productService.getOrderedProducts().subscribe((res: GetOrderResponse) => {
      this.productService.setOrderedProducts(res);
    });

    this.productService.getOrderedProducts$().subscribe(res => {
      this.products = res.products;
      const sum = this.products.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.price);
      }, 0);
      this.totalPrice = sum;
    })
  }

  checkOut(): void {
    this.productService.completeOrder().subscribe(res =>{
      if(res.id) {
        alert('Check Out Successful!');
        this.products = [];
        this.totalPrice = 0;
        this.productService.reset();
      } else {
        alert('Cart is empty!');
      }
    });
  }

  onRemove(productId: number): void {
    this.productService.deleteOrderedProduct(productId).subscribe();
  }
}
