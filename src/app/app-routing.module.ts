import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadPageComponent } from './a-user/download-page/download-page.component';
import { EditingPageComponent } from './a-user/editing-page/editing-page.component';
import { NotificationsPageComponent } from './a-user/notifications-page/notifications-page.component';
import { UserDashboardComponent } from './a-user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './a-user/user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { BlogPanelComponent } from './admin/blog-panel/blog-panel.component';
import { DataComponent } from './admin/data/data.component';
import { MorphologyComponent } from './admin/morphology/morphology.component';
import { PanelComponent } from './admin/panel/panel.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminGuard } from './guards/admin.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { BlogComponent } from './pages/blog/blog.component';
import { EditorComponent } from './pages/editor/editor.component';
import { FileComponent } from './pages/file/file.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProcessingComponent } from './pages/processing/processing.component';
import { UploadFileComponent } from './pages/upload-file/upload-file.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { MainComponent } from './shell/main/main.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AnonymousGuard],
    component: HomepageComponent,
    // pathMatch: 'full',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: MainComponent,
      },

      {
        path: 'processing',
        component: ProcessingComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'upload-file',
        component: UploadFileComponent,
      },
      {
        path: 'editor',
        component: EditorComponent,
      },
    ],
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'panel',
        pathMatch: 'full',
      },
      {
        path: 'panel',
        component: PanelComponent,
      },
      {
        path: 'main',
        component: AdminMainPageComponent,
      },
      {
        path: 'data',
        component: DataComponent,
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'blog',
        component: BlogPanelComponent,
      },
      {
        path: 'morphologies',
        component: MorphologyComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'download',
        component: DownloadPageComponent,
      },
      {
        path: 'editing',
        component: EditingPageComponent,
      },
      {
        path: 'notifications',
        component: NotificationsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
