import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { name: 'Admin User', email: 'admin@eshop.com', password: 'admin123', role: 'admin' },
    { name: 'Jane Doe',   email: 'user@eshop.com',  password: 'user123',  role: 'customer' }
  ];

  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string, role: 'admin' | 'customer'): boolean {
    const exists = this.users.find(u => u.email === email);
    if (exists) return false;
    const newUser: User = { name, email, password, role };
    this.users.push(newUser);
    this.currentUser = newUser;
    return true;
  }

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}