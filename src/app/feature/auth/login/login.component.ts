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
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage = signal<string>('');
  userEmail = signal<string>('');
  isLoading = signal<boolean>(false);

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private toastrService: ToastrService = inject(ToastrService);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z][0-9]{4}$/),
    ]),
  });

  loginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.loginAPI(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          //1 token in localstorage
          localStorage.setItem('userToken', res.token);
          //2 service decode token and sahred data
          this.authService.setUserData();
          //3 routing to home
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
          console.log(err.error.message);
          this.isLoading.set(false);
        },
      });
    }
  }

  forgetPassword() {
    if (this.loginForm.value.email) {
      this.userEmail.set(this.loginForm.value.email);
      console.log(this.userEmail());
      this.authService.forgetPassword(this.userEmail()).subscribe({
        next: (res) => {
          this.toastrService.show('Check your Email for the verification Code');
          this.router.navigate(['forgetPassword']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else
      this.toastrService.error(
        'please enter your email to continue',
        'Enter your Email'
      );
  }
}
