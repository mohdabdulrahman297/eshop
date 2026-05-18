import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService, Order } from '../../services/order';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistory implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.orders = this.orderService.getByUser(user.email);
    }
  }

  statusColor(status: Order['status']): string {
    const map: Record<Order['status'], string> = {
      pending:    'warning',
      processing: 'info',
      shipped:    'primary',
      delivered:  'success',
      cancelled:  'danger'
    };
    return map[status];
  }
}