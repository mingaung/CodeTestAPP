import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/service/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    var token =sessionStorage.getItem("token")
    if(token){
      //const authToken=token;
      const authReq= req.clone({
        headers: req.headers.set('Authorization','Bearer '+token)
      });
      return next.handle(authReq);
    }
    else{
      return next.handle(req);
    }
    
  }
}
