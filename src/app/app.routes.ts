import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Home } from './pages/home/home';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { OrderHistory } from './pages/order-history/order-history';
import { AddProduct } from './pages/add-product/add-product';
import { AdminOrders } from './pages/admin-orders/admin-orders';

export const routes: Routes = [
  { path: '',              redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',         component: Login },
  { path: 'signup',        component: Signup },
  { path: 'home',          component: Home },
  { path: 'product/:id',   component: ProductDetail },
  { path: 'cart',          component: Cart },
  { path: 'checkout',      component: Checkout },
  { path: 'order-history', component: OrderHistory },
  { path: 'add-product',   component: AddProduct },
  { path: 'admin-orders',  component: AdminOrders },
  { path: '**',            redirectTo: 'login' }
];