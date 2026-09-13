import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private httpClient: HttpClient = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}categories`);
  }
  getAllSubcategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}subcategories`);
  }
  getSpecCategory(categId: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}categories/${categId}/subcategories`
    );
  }

  getCategoryById(categId: string | null) {
    return this.httpClient.get(`${environment.baseUrl}categories/${categId}`);
  }
}
