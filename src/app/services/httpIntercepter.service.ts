import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest: HttpRequest<any> = request.clone({
      url: baseUrl + request.url,
      params: request.params.append(
        'appid',
        '598b114274eec032057ce55b8b32d864'
      ),
    });
    return next.handle(modifiedRequest);
  }
}
