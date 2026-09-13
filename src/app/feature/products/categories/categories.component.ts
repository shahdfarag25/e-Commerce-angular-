import { Component, inject, signal } from '@angular/core';
import { Category } from '../../../core/interfaces/product';
import { CategoryService } from '../../../core/services/category/category.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private categoryService: CategoryService = inject(CategoryService);
  allCategories = signal<Category[]>([]);
  Subcatg = signal<Category[]>([]);
  categId = signal<string | null>('');
  categName = signal<string | null>('');

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

  subCategory(categId: string) {
    this.categoryService.getSpecCategory(categId).subscribe({
      next: (res) => {
        this.Subcatg.set(res.data);
        console.log(res);
        this.loadCategoryNameFromId(categId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadCategoryNameFromId(categId: string) {
    this.categoryService.getCategoryById(categId).subscribe({
      next: (res: any) => {
        this.categName.set(res.data.name);
      },
      error: (err) => console.log(err),
    });
  }
}
