import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { MatchPassword, patternValidator } from 'src/app/shared/utils';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  
  registerForm: FormGroup | undefined;
  passwordVisibility = false;
  confirmPasswordVisibility = false;

  constructor(private authService: AuthenticationService, private fb: FormBuilder, private router: Router,) { }

  ngOnInit(): void {
  }
  register(){
    this._initRegisterForm();
    this.authService.SignUp('tekla@gmail.com', 'Tekla123')
  }
  private _initRegisterForm() {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          Validators.compose([Validators.required, patternValidator()]),
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: MatchPassword,
      }
    );
  }
  onSubmit() {
    // this.submitted = true;
    if (this.registerForm?.valid) {
      const user = this.registerForm.value;
      // this.loadingService.startLoading();
      this.authService
        .SignUp(user.email, user.password)
        .pipe(finalize(() => this.loadingService.stopLoading()))
        .subscribe({
          //TODO
          // next: () => this.router.navigate(['/sadme']),
          // error: (err) =>
          //   this.toastrService.showErrorMessage(showAuthError(err)),
        });
    } else {
      // this.toastrService.showErrorMessage(
      //   'Not all fields in form group are valid.'
      // );
    }
  }
  togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  toggleConfirmPassword() {
    this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
  }
}
