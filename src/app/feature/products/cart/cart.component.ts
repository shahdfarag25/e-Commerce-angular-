import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { OrderService } from '../../../core/services/order/order.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private cartService: CartService = inject(CartService);
  private orderService: OrderService = inject(OrderService);
  private toastrService: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);
  allCartProducts = signal<any[]>([]);
  totalPrice = signal<any[]>([]);
  cartId = signal<string>('');

  ngOnInit(): void {
    this.getAllCart();
  }

  removeItem(pId: string) {
    this.cartService.removeSpecProduct(pId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(
          'Cart Item Deleted Successfully',
          'Cart Operations!'
        );
        this.getAllCart();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllCart() {
    this.cartService.getAllCart().subscribe({
      next: (res) => {
        this.allCartProducts.set(res.data.products);
        this.totalPrice.set(res.data.totalCartPrice);
        this.cartId.set(res.cartId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCount(pId: string, pCount: number) {
    if (pCount <= 0) {
      this.removeItem(pId);
    } else {
      this.cartService.updateCart(pId, pCount).subscribe({
        next: (res) => {
          this.toastrService.success(
            'Cart Item Updated Successfully',
            'Cart Operations!'
          );
          this.getAllCart();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  clearCart() {
    let userRes = confirm('Are you sure you want to clear you cart?');
    if (userRes) {
      this.cartService.clearAllCart().subscribe({
        next: (res) => {
          this.toastrService.success(
            'Cart Cleared successfully',
            'Cart Operations!'
          );
          this.getAllCart();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  requestOrder() {
    //cart id
    //address page ==>routing
    this.router.navigate(['/order', this.cartId()]);
  }
}
