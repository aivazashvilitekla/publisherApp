import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss'],
})
export class UserSidebarComponent implements OnInit {
  faSignOut = faSignOut
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}
  signOut() {
    this.authService.SignOut().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/home']);
      },
    });
  }
}
