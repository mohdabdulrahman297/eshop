import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { OrderService, Order } from '../../services/order';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrders implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders = this.orderService.getAll();
  }

  updateStatus(id: string, event: Event) {
    const status = (event.target as HTMLSelectElement).value as Order['status'];
    this.orderService.updateStatus(id, status);
    this.orders = this.orderService.getAll();
  }

  statusColor(status: Order['status']): string {
    const map: Record<Order['status'], string> = {
      pending: 'warning', processing: 'info',
      shipped: 'primary', delivered: 'success', cancelled: 'danger'
    };
    return map[status];
  }
}