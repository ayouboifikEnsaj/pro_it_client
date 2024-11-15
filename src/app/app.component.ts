import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "./services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'proIT';
  constructor(private authService:AuthServiceService) {
  }

  ngOnInit(): void {
    this.authService.getJwtFromLocalStorage();
  }

}
