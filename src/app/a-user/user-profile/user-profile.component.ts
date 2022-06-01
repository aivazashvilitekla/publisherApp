import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { format } from 'date-fns';
interface User {
  firstName: string;
  lastName: string;
  registerDate: string;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  firstName!: string;
  lastName!: string;
  registerDate!: string;
  // user: User | undefined;

  constructor(private authservice: AuthenticationService) {}

  ngOnInit() {
    const { firstName, lastName, registerDate } =
      this.authservice.getUserInfo();
    this.firstName = firstName;
    this.lastName = lastName;
    this.registerDate = format(new Date(registerDate), 'MM/dd/yyyy');
    // console.log(registerDate);
    // console.log(this.firstName, this.lastName, this.registerDate);
  }
}
