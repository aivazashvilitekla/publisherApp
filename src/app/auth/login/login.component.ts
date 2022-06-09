import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faLock, faEye} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';
import { showAuthError } from 'src/app/shared/utils';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faEye = faEye;

  submitted = false;
  passwordVisibility = false;
  authError: boolean = false;

  loginForm: FormGroup | undefined;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrMessagesService,
    private loadingService: LoadingService
  ) {}

  private _initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  ngOnInit() {
    this._initLoginForm();
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm?.valid) {
      const user = this.loginForm.value;
      this.loadingService.startLoading();
      this.auth.SignIn(user.email, user.password).subscribe({
        complete: () => {
          this.loadingService.stopLoading();
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/']);
          if(user.email==='admin@gmail.com') localStorage.setItem('admin', 'true');
        },
        error: (error) => {
          this.loadingService.stopLoading();
          this.authError = !this.authError;
          this.toastrService.showErrorMessage(showAuthError(error));
        },
      });
    } else {
      this.toastrService.showErrorMessage(
        'Not all fields in form group are valid.'
      );
    }
  }
}
