import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthServiceService} from "../services/auth-service.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  constructor(private auth:AuthServiceService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!req.url.includes("/login")){
    let newRequest=req.clone({
      headers:req.headers.set('Authorization','Bearer '+this.auth.accessToken)
    })
    return next.handle(newRequest);
  }
    else return next.handle(req);
  }

}


/*export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req);
};*/
