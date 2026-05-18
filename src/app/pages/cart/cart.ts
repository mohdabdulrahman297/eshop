import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { CartService, CartItem } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  increase(id: number) {
    this.cartService.updateQty(id, 1);
    this.items = this.cartService.getItems();
  }

  decrease(id: number) {
    this.cartService.updateQty(id, -1);
    this.items = this.cartService.getItems();
  }

  remove(id: number) {
    this.cartService.remove(id);
    this.items = this.cartService.getItems();
  }

  get total() {
    return this.cartService.getTotal();
  }

  get count() {
    return this.cartService.getCount();
  }
}