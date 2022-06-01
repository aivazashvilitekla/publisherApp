import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    if (this.authService.currentUser) {
      this.loggedIn = true;
    }
    console.log(this.authService.currentUser);
  }
}
