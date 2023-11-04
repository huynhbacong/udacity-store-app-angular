import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  products: Product[] = [];
  
  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        name: 'test',
        price: 10.00,
        category: 1,
        imgSrc: 'https://m.media-amazon.com/images/I/81PtF30TLUL._AC_UY1100_.jpg'
      } as Product
    ]
  }
}
