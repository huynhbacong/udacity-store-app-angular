import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerInfo } from 'src/app/models/customerInfo';
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
  isNeedAuth: boolean = false;
  isCheckoutSuccess: boolean = false;
  customerInfo: CustomerInfo = {
    fullname: '',
    address: '',
    creditCardNumber: '',
    orderPrice: 0
  }

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

    this.productService.getOrderedProducts().subscribe((res: GetOrderResponse) => {
      this.productService.setOrderedProducts(res);
    });

    this.productService.getOrderedProducts$().subscribe(res => {
      this.products = res.products ?? [];
      const sum = this.products.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.price);
      }, 0);
      this.totalPrice = sum;
    })
  }

  checkOut(customerInfo: CustomerInfo): void {
    this.checkAuth();
    this.customerInfo = customerInfo;
    this.customerInfo.orderPrice = this.totalPrice;

    this.productService.completeOrder(this.products).subscribe(res => {
      if(res) {
        this.isCheckoutSuccess = true;
        this.productService.reset();
      } else {
        alert('Cart is empty!');
      }
    });
  }

  onRemove(productId: number): void {
    this.productService.deleteOrderedProduct(productId).subscribe(() => {
      alert('Removed from cart');
    });
  }

  checkAuth(): void {
    this.authService.getToken().subscribe(res => {
      if (!res) {
        this.isNeedAuth = true;
      }
    });
  }
}
