import { Component, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  private cartService: CartService = inject(CartService);
  private wishlistService: WishlistService = inject(WishlistService);
  private toastrService: ToastrService = inject(ToastrService);
  allWishlist = signal<Product[]>([]);

  ngOnInit(): void {
    this.displayWishList();
  }
  displayWishList() {
    this.wishlistService.getAllWishlist().subscribe({
      next: (res) => {
        this.allWishlist.set(res.data);
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(pId: string) {
    this.wishlistService.removeItem(pId).subscribe({
      next: (res) => {
        console.log(res);
        this.displayWishList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToCart(pId: string) {
    this.cartService.addToCart(pId).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Cart Operations!');
        this.removeItem(pId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
