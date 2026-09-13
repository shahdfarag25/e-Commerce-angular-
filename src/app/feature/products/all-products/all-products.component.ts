import { Component } from '@angular/core';
import { ProductSharedComponent } from '../../../shared/components/product-shared/product-shared.component';

@Component({
  selector: 'app-all-products',
  imports: [ProductSharedComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent {}
