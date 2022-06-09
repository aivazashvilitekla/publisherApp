import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  loggedIn: boolean = false;
  admin: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    console.log(localStorage.getItem('loggedIn'));
    if (localStorage.getItem('loggedIn')) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    if (localStorage.getItem('admin')) {
      this.admin = true;
    } else {
      this.admin = false;
    }
    // console.log(this.authService.currentUser);
  }
}
