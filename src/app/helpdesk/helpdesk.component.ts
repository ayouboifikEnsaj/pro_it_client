import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrl: './helpdesk.component.css'
})
export class HelpdeskComponent {
  constructor(public authService: AuthServiceService, private router: Router) {}
  ngOnInit(){}
  handleLogout() {
    this.authService.logout();

  }
}
