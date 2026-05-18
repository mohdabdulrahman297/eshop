import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  emoji: string;
  desc: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', stock: 50, emoji: '🎧', desc: 'Noise-cancelling over-ear headphones with 30h battery.' },
    { id: 2, name: 'Running Shoes',       price: 49.99, category: 'Sports',      stock: 120, emoji: '👟', desc: 'Lightweight running shoes with responsive cushioning.' },
    { id: 3, name: 'Programming Book',    price: 34.99, category: 'Books',       stock: 80,  emoji: '📚', desc: 'Clean Code by Robert C. Martin — must-read for devs.' },
    { id: 4, name: 'Smartwatch',          price: 199.99, category: 'Electronics', stock: 30, emoji: '⌚', desc: 'Health tracking, GPS, 7-day battery life.' },
    { id: 5, name: 'Backpack',            price: 59.99, category: 'Clothing',    stock: 60,  emoji: '🎒', desc: '20L everyday carry with laptop sleeve.' },
    { id: 6, name: 'Mechanical Keyboard', price: 89.99, category: 'Electronics', stock: 45,  emoji: '💻', desc: 'TKL compact layout, Cherry MX switches.' },
    { id: 7, name: 'Soccer Ball',         price: 24.99, category: 'Sports',      stock: 200, emoji: '⚽', desc: 'FIFA Quality Pro match ball, size 5.' },
    { id: 8, name: 'Potted Plant',        price: 14.99, category: 'Home',        stock: 75,  emoji: '🪴', desc: 'Low-maintenance succulent arrangement.' },
  ];

  private nextId = 9;

  getAll(): Product[] {
    return [...this.products];
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  add(product: Omit<Product, 'id'>): Product {
    const newProduct = { ...product, id: this.nextId++ };
    this.products.push(newProduct);
    return newProduct;
  }
}