import { Component } from '@angular/core';
import {AuthServiceService} from "../services/auth-service.service";
import {DecodedToken} from "../models/model/model.module";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-custom-sidebar',
  templateUrl: './custom-sidebar.component.html',
  styleUrl: './custom-sidebar.component.css'
})
export class CustomSidebarComponent {
  isAdmin: boolean = false;
  isTechnicien: boolean = false;
  isHelpdesk: boolean = false;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      this.isAdmin = decodedToken.roles.includes('ADMIN');
      this.isTechnicien = decodedToken.roles.includes('TECHNICIEN');
      this.isHelpdesk = decodedToken.roles.includes('HELP_DESK');
    }
  }

}
