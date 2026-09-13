import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MyplatformService } from '../services/myPlatform/myplatform.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router: Router = inject(Router);
  let myplatformService: MyplatformService = inject(MyplatformService);

  if (myplatformService.checkPlatformBrowser()) {
    if (localStorage.getItem('userToken')) {
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
  }
  return router.createUrlTree(['/login']);
};
