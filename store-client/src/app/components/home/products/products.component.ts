import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        name: 'test',
        price: 10.00,
        category: 1,
        imgSrc: 'https://m.media-amazon.com/images/I/81PtF30TLUL._AC_UY1100_.jpg'
      } as Product
    ];

    this.productService.getProductList().subscribe(res => {
      this.products = res
    });
  }
  
}
