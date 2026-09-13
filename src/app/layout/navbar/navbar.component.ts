import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/services/auth/auth.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogin = signal<boolean>(false);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  constructor(private flowbiteService: FlowbiteService) {}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.checklogin();
  }

  checklogin() {
    this.authService.userData.subscribe({
      next: (res) => {
        if (this.authService.userData.getValue() !== null) {
          this.isLogin.set(true);
        } else {
          this.isLogin.set(false);
        }
      },
    });
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.authService.userData.next(null);
    this.router.navigate(['/login']);
  }
}
