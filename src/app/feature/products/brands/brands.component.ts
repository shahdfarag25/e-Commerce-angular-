import { Component, inject, signal } from '@angular/core';
import { Brand } from '../../../core/interfaces/brand';
import { BrandService } from '../../../core/services/brand/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent {
  private brandService = inject(BrandService);

  allBrands = signal<Brand[]>([]);
  selectedBrand = signal<Brand>({} as Brand);
  isModalOpen = signal(false);

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands.set(res.data);
        console.log(res.data);
      },
      error: (err) => console.log(err),
    });
  }

  openBrandModal(brand: Brand) {
    this.selectedBrand.set(brand);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
