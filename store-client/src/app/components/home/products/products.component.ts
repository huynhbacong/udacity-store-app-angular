import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  @Output() addToCart = new EventEmitter<Product>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        name: 'test',
        price: 10.00,
        category: 1,
        imgsrc: 'https://m.media-amazon.com/images/I/81PtF30TLUL._AC_UY1100_.jpg',
        productAmount: 1
      } as Product
    ];

    this.productService.getProductList().subscribe(res => {
      console.log("responsed",res);
      
      this.products = res;
      console.log(this.products);
      
    });
  }

  onAddCart(product: Product): void {
    this.addToCart.emit(product);
  }
}
