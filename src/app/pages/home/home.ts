import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { ProductService, Product } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  products: Product[] = [];
  addedProductId: number | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getAll();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  addToCart(product: Product) {
    this.cartService.add(product);
    this.addedProductId = product.id;
    setTimeout(() => this.addedProductId = null, 1500);
  }

  logout() {
    this.authService.logout();
  }
}