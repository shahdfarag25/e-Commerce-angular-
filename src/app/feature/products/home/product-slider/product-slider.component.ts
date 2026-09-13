import { Component, inject, Input, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category, Product } from '../../../../core/interfaces/product';
import { CategoryService } from '../../../../core/services/category/category.service';
@Component({
  selector: 'app-product-slider',
  imports: [CarouselModule],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss',
})
export class ProductSliderComponent {
  @Input() products: Product[] = [];

  private categoryService: CategoryService = inject(CategoryService);
  allCategories = signal<Category[]>([]);

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories.set(res.data);
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 4,
      },
      740: {
        items: 6,
      },
      940: {
        items: 8,
      },
    },
    nav: true,
  };
}
