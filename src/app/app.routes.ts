import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ForgetPasswordComponent } from './feature/auth/forget-password/forget-password.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { AllProductsComponent } from './feature/products/all-products/all-products.component';
import { BrandsComponent } from './feature/products/brands/brands.component';
import { CartComponent } from './feature/products/cart/cart.component';
import { CategoriesComponent } from './feature/products/categories/categories.component';
import { HomeComponent } from './feature/products/home/home.component';
import { AllOrdersComponent } from './feature/products/order/all-orders/all-orders.component';
import { OrderComponent } from './feature/products/order/order/order.component';
import { ProductDetailesComponent } from './feature/products/product-detailes/product-detailes.component';
import { WishlistComponent } from './feature/products/wishlist/wishlist.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    title: 'Forget Password',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Carts',
    canActivate: [authGuard],
  },
  {
    path: 'brands',
    component: BrandsComponent,
    title: 'Brands',
    canActivate: [authGuard],
  },
  {
    path: 'products',
    component: AllProductsComponent,
    title: 'Products',
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'Wish List',
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    component: AllOrdersComponent,
    title: 'All Orders',
    canActivate: [authGuard],
  },
  {
    path: 'details/:id',
    component: ProductDetailesComponent,
    title: 'Product Details',
    canActivate: [authGuard],
  },
  {
    path: 'order/:cartId',
    component: OrderComponent,
    title: 'Request Order',
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'Categories',
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
