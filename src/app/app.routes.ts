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
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '',              redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',         component: Login },
  { path: 'signup',        component: Signup },
  { path: 'home',          component: Home,          canActivate: [authGuard] },
  { path: 'product/:id',   component: ProductDetail, canActivate: [authGuard] },
  { path: 'cart',          component: Cart,          canActivate: [authGuard] },
  { path: 'checkout',      component: Checkout,      canActivate: [authGuard] },
  { path: 'order-history', component: OrderHistory,  canActivate: [authGuard] },
  { path: 'add-product',   component: AddProduct,    canActivate: [authGuard, adminGuard] },
  { path: 'admin-orders',  component: AdminOrders,   canActivate: [authGuard, adminGuard] },
  { path: '**',            redirectTo: 'login' }
];