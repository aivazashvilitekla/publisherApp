import { Component, OnInit } from '@angular/core';
import { faPerson} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faPerson = faPerson;

  constructor() { }

  ngOnInit(): void {
  }

}
