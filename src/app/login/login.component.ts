import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formLogin! :FormGroup;
  roles!:any;
  visibility:boolean=false;
  constructor(private fb:FormBuilder,private authService:AuthServiceService,private router:Router) {
  }
  ngOnInit() {
    this.formLogin=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }

  submitLogin() {
    let username=this.formLogin.value.username;
    let password=this.formLogin.value.password;
    this.authService.login(username,password).subscribe({
      next:data => {
        this.authService.loadProfile(data);
        this.roles=this.authService.roles;
        if(this.roles.includes("ADMIN")){
          this.router.navigateByUrl("/admin/reporting");
        }
        else
          if(this.roles.includes("TECHNICIEN")){
            this.router.navigateByUrl("/technicien");
        }
        else {
            this.router.navigateByUrl("/helpdesk");
        }
      },
      error:err => {
        console.log(err);
        this.visibility=true;
      }

    });
  }
}
