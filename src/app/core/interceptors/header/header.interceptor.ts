import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MyplatformService } from './../../services/myPlatform/myplatform.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let myplatformService: MyplatformService = inject(MyplatformService);
  if (myplatformService.checkPlatformBrowser()) {
    if (localStorage.getItem('userToken')) {
      let userTokenHeader: any = { token: localStorage.getItem('userToken') };
      req = req.clone({
        setHeaders: userTokenHeader,
      });
    }
  }

  return next(req);
};
