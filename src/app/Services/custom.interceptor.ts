import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const localToken = sessionStorage.getItem('token');
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localToken}`
    }
  });
  return next(cloneRequest);
};
