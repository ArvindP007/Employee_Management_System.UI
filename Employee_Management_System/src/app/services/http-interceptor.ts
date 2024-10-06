import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private notification: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the token from localStorage
        const token = localStorage.getItem('jwt');

        // Clone the request and add the Authorization header if the token exists
        if (token) {
            request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        return next.handle(request).pipe(
            tap((response: HttpEvent<any>) => {
                if (response instanceof HttpResponse) {
                    // You can handle successful responses here if needed
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this.notification.error(err?.error?.Message || err?.message);
                }
            })
        );
    }
}
