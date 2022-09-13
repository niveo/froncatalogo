import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Inject, Injectable, InjectionToken, NgModule } from "@angular/core";
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { APP_CONFIG, IConfigToken } from "../common/app-config";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(@Inject(APP_CONFIG) private config: IConfigToken) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;
    if (!req.url.startsWith(this.config.root_http) && !url.includes('assets')) {
      url = this.config.root_http + url;
    }

    const dupReq = req.clone({
      url: url
    });
    return next.handle(dupReq);
  }
}

const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: any) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutc: number = Number(req.headers.get('timeout')) || this.defaultTimeout;
    req.headers.delete('timeout');
    return next.handle(req).pipe(timeout(timeoutc));
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 30000 }
  ],
})

export class InterceptorModule { }
