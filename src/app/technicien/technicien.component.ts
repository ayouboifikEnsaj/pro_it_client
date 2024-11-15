import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrl: './technicien.component.css'
})
export class TechnicienComponent implements OnInit{
  constructor(public authService: AuthServiceService, private router: Router) {}
  ngOnInit(){}
  handleLogout() {
    this.authService.logout();

  }
    
}



