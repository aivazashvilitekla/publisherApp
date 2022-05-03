import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './guards/anonymous.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AnonymousGuard],
    component: HomepageComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
