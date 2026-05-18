import { Injectable } from '@angular/core';
import { Product } from './product';

export interface CartItem extends Product {
  qty: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return [...this.items];
  }

  getCount(): number {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  add(product: Product, qty: number = 1): void {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ ...product, qty });
    }
  }

  updateQty(id: number, delta: number): void {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        this.remove(id);
      }
    }
  }

  remove(id: number): void {
    this.items = this.items.filter(i => i.id !== id);
  }

  clear(): void {
    this.items = [];
  }
}