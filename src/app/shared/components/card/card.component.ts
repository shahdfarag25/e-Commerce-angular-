import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() oneProduct: Product = {} as Product;
  private cartService: CartService = inject(CartService);
  private wishlistService: WishlistService = inject(WishlistService);
  private toastrService: ToastrService = inject(ToastrService);
  addToCart(pId: string) {
    this.cartService.addToCart(pId).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Cart Operations!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishlist(pId: string) {
    this.wishlistService.addToWishlist(pId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, 'wishList Operations!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
