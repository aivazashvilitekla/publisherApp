import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
  }
  signOut() {
    this.authService.SignOut().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/home']);
      },
    });
  }

}
