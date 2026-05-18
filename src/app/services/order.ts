import { Injectable } from '@angular/core';
import { CartItem } from './cart';

export interface OrderItem {
  name: string;
  emoji: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Order[] = [
    {
      id: 'ORD-1001', userId: 'user@eshop.com', date: '2026-05-10',
      status: 'delivered', total: 129.97,
      items: [{ name: 'Wireless Headphones', emoji: '🎧', qty: 1, price: 79.99 },
              { name: 'Soccer Ball', emoji: '⚽', qty: 2, price: 24.99 }]
    },
    {
      id: 'ORD-1002', userId: 'user@eshop.com', date: '2026-05-14',
      status: 'shipped', total: 49.99,
      items: [{ name: 'Running Shoes', emoji: '👟', qty: 1, price: 49.99 }]
    },
    {
      id: 'ORD-1003', userId: 'admin@eshop.com', date: '2026-05-15',
      status: 'pending', total: 199.99,
      items: [{ name: 'Smartwatch', emoji: '⌚', qty: 1, price: 199.99 }]
    }
  ];

  private nextNum = 1004;

  getAll(): Order[] {
    return [...this.orders];
  }

  getByUser(email: string): Order[] {
    return this.orders.filter(o => o.userId === email);
  }

  place(email: string, items: CartItem[], total: number): Order {
    const order: Order = {
      id: `ORD-${this.nextNum++}`,
      userId: email,
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
      total,
      items: items.map(i => ({ name: i.name, emoji: i.emoji, qty: i.qty, price: i.price }))
    };
    this.orders.push(order);
    return order;
  }

  updateStatus(id: string, status: Order['status']): void {
    const order = this.orders.find(o => o.id === id);
    if (order) order.status = status;
  }
}