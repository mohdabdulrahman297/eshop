import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, CurrencyPipe } from '@angular/common';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | undefined;
  added = false;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getById(id);
    if (!this.product) this.router.navigate(['/home']);
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.add(this.product, this.qty);
    this.added = true;
    setTimeout(() => this.added = false, 2000);
  }

  increaseQty() { this.qty++; }
  decreaseQty() { if (this.qty > 1) this.qty--; }
}