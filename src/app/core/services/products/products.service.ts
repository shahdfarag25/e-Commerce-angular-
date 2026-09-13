import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private httpClient: HttpClient = inject(HttpClient);
  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}products`);
  }
  getSpecProduct(pId: string | null): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}products/${pId}`);
  }

  searchPrice(pPrice: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseUrl}products?price[lte]=${pPrice}`
    );
  }
}
