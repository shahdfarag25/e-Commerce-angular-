import { Component } from '@angular/core';
import { ProductSharedComponent } from '../../../shared/components/product-shared/product-shared.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';

@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    ProductSharedComponent,
    ProductSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // @Output() homeProducts = signal<Product[]>([]);
}
