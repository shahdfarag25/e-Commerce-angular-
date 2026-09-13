import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private httpClient: HttpClient = inject(HttpClient);

  addToWishlist(pId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}wishlist`, {
      productId: pId,
    });
  }
  getAllWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}wishlist`);
  }
  removeItem(pId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}wishlist/${pId}`);
  }
}
