import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Order } from '../../../../core/interfaces/order';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { OrderService } from '../../../../core/services/order/order.service';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent {
  private orderService: OrderService = inject(OrderService);
  private authService: AuthService = inject(AuthService);
  allOrders = signal<Order[]>([]);

  ngOnInit(): void {
    this.orderService.getAllOrders(this.authService.getUserId()).subscribe({
      next: (res) => {
        this.allOrders.set(res);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
