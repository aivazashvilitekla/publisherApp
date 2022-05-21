import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { MainComponent } from './shell/main/main.component';
import { FileComponent } from './pages/file/file.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { DataComponent } from './admin/data/data.component';
import { ProcessingComponent } from './pages/processing/processing.component';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    FileComponent,
    AdminDashboardComponent,
    SidebarComponent,
    DataComponent,
    ProcessingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FontAwesomeModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AdminRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
