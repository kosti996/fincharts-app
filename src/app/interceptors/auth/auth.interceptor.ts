import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).getToken();
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken || ''}`),
  });
  return next(newReq);
}