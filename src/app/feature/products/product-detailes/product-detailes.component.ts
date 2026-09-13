import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/interfaces/product';
import { CartService } from '../../../core/services/cart/cart.service';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-product-detailes',
  imports: [],
  templateUrl: './product-detailes.component.html',
  styleUrl: './product-detailes.component.scss',
})
export class ProductDetailesComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  pId: string | null = '';
  product = signal<Product>({} as Product);
  private productsService: ProductsService = inject(ProductsService);

  ngOnInit(): void {
    //get the id
    this.activatedRoute.paramMap.subscribe((param) => {
      this.pId = param.get('id');
      //api call with the id
      this.productsService.getSpecProduct(this.pId).subscribe({
        next: (res) => {
          this.product.set(res.data);
          console.log(res.data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
  private cartService: CartService = inject(CartService);
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
}
