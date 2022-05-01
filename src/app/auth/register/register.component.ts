import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { faPerson, faLock} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faPerson = faPerson;
  faLock = faLock;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }
  register(){
    this.authService.SignUp('tekla@gmail.com', 'Tekla123')
  }
}
