import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient: HttpClient = inject(HttpClient);

  getAllOrders(userId: string | null): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}orders/user/${userId}`);
  }

  createCashOrder(
    cartId: string | null,
    addressValue: object
  ): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}orders/${cartId}`, {
      shippingAddress: addressValue,
    });
  }

  checkoutSession(
    cartId: string | null,
    addressValue: object
  ): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}orders/checkout-session/${cartId}?url=${environment.ecommURL}`,
      { shippingAddress: addressValue }
    );
  }
}
