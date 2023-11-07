import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: Product = {
    id: 0,
    name: '',
    category: 1,
    price: 9.99,
    imgsrc: '',
    productAmount: 1
  }

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    // Access route parameters using paramMap observable
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');
      this.productService.getProductList().subscribe(res => {
        this.product = res.find(x => x.id == Number(productId)) ?? this.product;
      })
    });
  }

  addToCart(): void {
    this.productService.addOrder(this.product).subscribe(() => {
      alert('Added to card!');
    });
  }
}
