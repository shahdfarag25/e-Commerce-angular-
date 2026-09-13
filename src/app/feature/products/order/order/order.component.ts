import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../../core/services/order/order.service';

@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  private orderService: OrderService = inject(OrderService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private toastrService: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

  cartId = signal<string | null>('');
  addressForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(01)[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.cartId.set(p.get('cartId'));
    });
  }
  cashPay() {
    let userRes = confirm('Are you sure you want to confirm order?');
    if (userRes) {
      this.orderService
        .createCashOrder(this.cartId(), this.addressForm.value)
        .subscribe({
          next: (res) => {
            this.toastrService.success(
              'Your order has been requested successfully!',
              'Order Completion!'
            );
            this.router.navigate(['/home']);
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  CardPay() {
    let userRes = confirm('Are you sure you want to confirm order?');
    if (userRes) {
      this.orderService
        .checkoutSession(this.cartId(), this.addressForm.value)
        .subscribe({
          next: (res) => {
            window.location.href = res.session.url;
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
