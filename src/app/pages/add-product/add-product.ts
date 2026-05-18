import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  name = '';
  price: number | null = null;
  category = '';
  stock: number | null = null;
  emoji = '';
  desc = '';
  errorMsg = '';
  success = false;

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    if (!this.name || !this.price || !this.category || !this.stock || !this.emoji || !this.desc) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }
    this.productService.add({
      name: this.name,
      price: this.price,
      category: this.category,
      stock: this.stock,
      emoji: this.emoji,
      desc: this.desc
    });
    this.success = true;
    setTimeout(() => this.router.navigate(['/home']), 1500);
  }
}