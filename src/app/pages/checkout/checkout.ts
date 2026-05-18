import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart';
import { OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  items: CartItem[] = [];
  name = '';
  address = '';
  city = '';
  card = '';
  orderPlaced = false;
  orderId = '';
  errorMsg = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    const user = this.authService.getCurrentUser();
    if (user) this.name = user.name;
    if (this.items.length === 0) this.router.navigate(['/cart']);
  }

  get total() { return this.cartService.getTotal(); }

  placeOrder() {
    if (!this.name || !this.address || !this.city || !this.card) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    const order = this.orderService.place(user.email, this.items, this.total);
    this.cartService.clear();
    this.orderId = order.id;
    this.orderPlaced = true;
  }
}