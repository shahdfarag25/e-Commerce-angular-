import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      // (defualt value , [validation array])
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z][0-9]{4}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z][0-9]{4}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(01)[0125][0-9]{8}$/),
      ]),
    },
    this.confirmPassword
  );

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { notMatched: true };
    }
    // g.get('password')?.value === g.get('rePassword')?.value?null:{ notMatched: true }
  }

  //submit button
  registerSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.authService.registerAPI(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          if (res.message == 'success') {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
          console.log(err.error.message);
          this.isLoading.set(false);
        },
      });
    }
  }
}
