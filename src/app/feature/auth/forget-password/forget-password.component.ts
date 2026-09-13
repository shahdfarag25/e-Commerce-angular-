import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  private authService: AuthService = inject(AuthService);
  private toastrService: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);
  shown = signal<boolean>(false);

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z][0-9]{4}$/),
    ]),
  });

  verifyReserCode() {
    this.authService
      .verifyCode(this.verifyCodeForm.get('resetCode')?.value)
      .subscribe({
        next: (res) => {
          this.toastrService.success(res.message, 'correct verification code');
          this.shown.set(true);
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  reserPassword() {
    if (this.newPasswordForm.valid) {
      const { email, password } = this.newPasswordForm.value;
      this.authService.resetPassword(email, password).subscribe({
        next: (res) => {
          this.toastrService.success(
            'Login now Successfully!',
            'Password updated!'
          );
          this.router.navigate(['/login']);
        },
        error: (err) => console.error('Reset failed', err),
      });
    }
  }
}
