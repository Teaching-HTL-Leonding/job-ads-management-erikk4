import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobAd, JobAdsService } from '../job-ads.service';

@Component({
  selector: 'app-job-ads',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-ads.component.html',
  styleUrl: './job-ads.component.css'
})
export class JobAdsComponent implements OnInit {
  jobAds = signal<JobAd[] | undefined>(undefined);
  private readonly jobAdsService = inject(JobAdsService);

  async ngOnInit() {
    this.jobAds.set(await this.jobAdsService.getJobAds());

  }

  async deleteJobAd(jobAdId: number) {
    await this.jobAdsService.deleteJobAd(jobAdId);
    this.jobAds.update(jobAds => jobAds?.filter((jobAd: JobAd) => jobAd.id !== jobAdId));
  }
}
