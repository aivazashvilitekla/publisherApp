import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { faUser, faLock, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import {
  MatchPassword,
  patternValidator,
  showAuthError,
} from 'src/app/shared/utils';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faEye = faEye;

  registerForm: FormGroup | undefined;
  registerInfo: FormGroup | undefined;
  registerPic: FormGroup | undefined;
  submitted = false;
  passwordVisibility = false;
  confirmPasswordVisibility = false;
  step: number = 1;
  user: any;
  userInfo: any;
  userPic: any;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private toastrService: ToastrMessagesService
  ) {}

  ngOnInit(): void {
    this._initRegisterForm();
    this._initRegisterInfo();
    this._initRegisterPic();
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
  private _initRegisterInfo() {
    this.registerInfo = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  private _initRegisterPic() {
    this.registerPic = this.fb.group({
      pic: ['', Validators.required],
      picOption: [''],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm?.valid) {
      this.user = this.registerForm.value;
      this.step++;
    } else {
      this.toastrService.showErrorMessage(
        'Not all fields in form group are valid.'
      );
    }
  }
  toStepThree() {
    if (this.registerInfo?.valid) {
      this.userInfo = this.registerInfo.value;
      this.step++;
    } else {
      this.toastrService.showErrorMessage('გთხოვთ შეავსეთ ყველა ველი.');
    }
  }
  finalSave() {
    if (this.registerInfo?.valid) {
      this.userInfo = this.registerInfo.value;
      const userData = {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        registerDate: new Date().toString(),
        email: this.user.email,
      };
      this.loadingService.startLoading();
      this.authService
        .SignUp(this.user.email, this.user.password, userData)
        .pipe(finalize(() => this.loadingService.stopLoading()))
        .subscribe({
          next: () => {
            localStorage.setItem('loggedIn', 'true');
            this.router.navigate(['/']);
          },
          error: (err) =>
            this.toastrService.showErrorMessage(showAuthError(err)),
        });
    } else {
      this.toastrService.showErrorMessage('გთხოვთ შეავსეთ ყველა ველი.');
    }
  }
  togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  toggleConfirmPassword() {
    this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
  }
}
