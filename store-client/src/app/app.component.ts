import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  orderedProductCount: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getOrderedProducts().subscribe(res => {
      this.productService.setOrderedProducts(res);
    });

    this.productService.getOrderedProducts$().subscribe(res => {
      this.orderedProductCount = res.products?.length ?? 0;
    })
  }
}
