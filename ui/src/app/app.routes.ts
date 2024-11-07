import { Routes } from '@angular/router';
import { JobAdsComponent } from './job-ads/job-ads.component';
import { JobAdDetailsComponent } from './job-ad-details/job-ad-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'job-ads', pathMatch: 'full' },
  { path: 'job-ads', component: JobAdsComponent },
  { path: 'job-ad-details/:ad', component: JobAdDetailsComponent}


];
