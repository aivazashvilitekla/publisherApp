import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AuthRoutingModule, ReactiveFormsModule
  ]
})
export class AuthModule { }
