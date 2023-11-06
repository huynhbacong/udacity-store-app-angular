import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: 1,
    imgsrc: '',
    productAmount: 1
  };
}
