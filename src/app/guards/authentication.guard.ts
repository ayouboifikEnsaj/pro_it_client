import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {AuthServiceService} from "../services/auth-service.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate{
  constructor(private authService:AuthServiceService,private router :Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAuthenticated){
      return true;
    }
    else {
      console.log("Gaurd : "+this.authService.isAuthenticated)
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}
