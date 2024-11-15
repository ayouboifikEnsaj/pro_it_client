import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  constructor(public authService:AuthServiceService ,private router:Router) {
  }
  ngOnInit() {
  }

  handleLogout() {
    this.authService.logout();

  }
}
