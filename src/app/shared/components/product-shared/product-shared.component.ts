import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../core/interfaces/product';
import { ProductsService } from '../../../core/services/products/products.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-product-shared',
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './product-shared.component.html',
  styleUrl: './product-shared.component.scss',
})
export class ProductSharedComponent {
  allSharedProducts = signal<Product[]>([]);
  pPrice: FormControl = new FormControl();

  private productsService: ProductsService = inject(ProductsService);
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allSharedProducts.set(res.data);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
