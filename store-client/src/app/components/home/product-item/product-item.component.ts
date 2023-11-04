import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: 1,
    imgSrc: ''
  };

  addToCart(amount: string) {
    this.product.amount = Number(amount);
    console.log(this.product.amount);
    console.log(amount);
  }
}
