import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  cookie: any = null;
  constructor() { }

  getCookie(k, r) {
    let value = (r = RegExp('(^|; )' + encodeURIComponent(k) + '=([^;]*)').exec(document.cookie)) ? r[2] : null;
    return value || "";
  }

  readCookie(req) {
    console.log(req.url);
    if(req.url.indexOf("itam-services/") > 0){
      return {'ITAM-X-XSRF-TOKEN' : this.getCookie("ITAM-XSRF-TOKEN", document.cookie)};
    }else if (req.url.indexOf('user-management/') > 0) {
      return { 'UM-X-XSRF-TOKEN': this.getCookie('UM-XSRF-TOKEN', document.cookie) };
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: this.readCookie(request)
    });
    return next.handle(request);
  }
}
