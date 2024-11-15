import {booleanAttribute, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {AppUserService} from "./app-user.service";
interface DecodedToken {
  exp: number;
  roles:string[];
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isAuthenticated : boolean=false;
  roles:any;
  username:any;
  accessToken!: any;
  aeroport!:any;
  constructor(private http:HttpClient,private router:Router,private appUserService:AppUserService) { }
  public login(username:string,password:string){
    // let options={
    //   headers:new HttpHeaders().set("Content-Type","")
    // }
    let params =new HttpParams().set("username",username).set("password",password);
    return this.http.post("http://localhost:8082/login",params);
  }
  getToken(): string | null {
    return window.localStorage.getItem('jwt-token');
  }
  loadProfile(data:any){
    this.isAuthenticated=true;
    console.log("pp "+this.isAuthenticated);
    this.accessToken=data['access-token'];
    let jwtDecoder =jwtDecode(this.accessToken);
    this.username=jwtDecoder.sub;
    let claims :any =JSON.parse(window.atob(this.accessToken.split('.')[1]));
    this.roles=claims.roles;
    this.aeroport=claims.aeroport;
    console.log("les roles :"+this.roles);
    console.log("le user : "+this.username);
    this.appUserService.getAeroport(this.username).subscribe((data: any[]) => {
      this.aeroport=data;
      console.log("AEROPORT : ",this.aeroport.id);
    });
    window.localStorage.setItem("jwt-token",this.accessToken);

    }


  logout() {
    this.isAuthenticated=false;
    this.accessToken=undefined;
    this.username=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }


  getJwtFromLocalStorage() {
    let token=window.localStorage.getItem("jwt-token");
    if(token){
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp > currentTime && decodedToken.roles.includes("ADMIN")) {
        this.loadProfile({ "access-token": token });
        this.router.navigateByUrl("/admin/reporting");
      }
      else if (decodedToken.exp > currentTime && decodedToken.roles.includes("TECHNICIEN")) {
        this.loadProfile({ "access-token": token });
        this.router.navigateByUrl("/technicien");
      }
      else if (decodedToken.exp > currentTime && decodedToken.roles.includes("HELP-DESK")) {
        this.loadProfile({ "access-token": token });
        this.router.navigateByUrl("/helpdesk");
      }
      else {
        console.log("Token is expired");
      }

    }
  }
  getUsername(): string | undefined {
    return this.username;
  }

}
