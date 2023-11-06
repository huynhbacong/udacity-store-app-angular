import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: 1,
    imgsrc: '',
    productAmount: 1
  };

  ngOnInit(): void {
    console.log(this.product);
    
  }
  @Output() onAddCart = new EventEmitter<Product>();

  addToCart(amount: string): void {
    this.product.productAmount = Number(amount);
    this.onAddCart.emit(this.product)
    console.log(this.product.productAmount);
    console.log(amount);
  }
}
