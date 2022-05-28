import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { BlogPanelComponent } from './admin/blog-panel/blog-panel.component';
import { DataComponent } from './admin/data/data.component';
import { MorphologyComponent } from './admin/morphology/morphology.component';
import { PanelComponent } from './admin/panel/panel.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { UsersComponent } from './admin/users/users.component';
import { AnonymousGuard } from './guards/anonymous.guard';
import { BlogComponent } from './pages/blog/blog.component';
import { FileComponent } from './pages/file/file.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProcessingComponent } from './pages/processing/processing.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AnonymousGuard],
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {
    path: 'file',
    component: FileComponent,
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
    path: 'admin',
    component: AdminDashboardComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
