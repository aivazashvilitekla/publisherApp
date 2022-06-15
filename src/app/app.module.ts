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

// firebase
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogPanelComponent } from './admin/blog-panel/blog-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './a-user/user-routing.module';
import { UserDashboardComponent } from './a-user/user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './a-user/user-sidebar/user-sidebar.component';
import { UserProfileComponent } from './a-user/user-profile/user-profile.component';
import { MorphologyComponent } from './admin/morphology/morphology.component';
import { UploadFileComponent } from './pages/upload-file/upload-file.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorComponent } from './pages/editor/editor.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { HypPageComponent } from './pages/hyp-page/hyp-page.component';
import { SecondLoadingComponent } from './shared/components/second-loading/second-loading.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

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
    ProcessingComponent,
    BlogComponent,
    BlogPanelComponent,
    DataComponent,
    MorphologyComponent,
    UserDashboardComponent,
    UserSidebarComponent,
    UserProfileComponent,
    UploadFileComponent,
    EditorComponent,
    DictionaryComponent,
    HypPageComponent,
    SecondLoadingComponent, AboutUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FontAwesomeModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AdminRoutingModule,
    ReactiveFormsModule,

    // AngularFirestore
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    UserRoutingModule,
    HttpClientModule, AngularEditorModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
