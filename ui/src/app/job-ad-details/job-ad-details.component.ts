import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { JobAd, JobAdsService } from '../job-ads.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-ad-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './job-ad-details.component.html',
  styleUrl: './job-ad-details.component.css'
})
export class JobAdDetailsComponent implements OnInit {
  jobAd = signal<JobAd | undefined>(undefined);
  jobAdTitle = signal<string | undefined>(undefined);
  jobAdText = signal<string | undefined>(undefined);

  private readonly jobAdsService = inject(JobAdsService);
  private readonly route = inject(ActivatedRoute);

  async ngOnInit() {
    const jobAdId = Number(this.route.snapshot.paramMap.get('ad'));
    this.jobAd.set(await this.jobAdsService.getJobAd(jobAdId));
  }

  async editJobAd(jobAdId: number | undefined, newTitle: string | undefined, newText: string | undefined) {
      await this.jobAdsService.updateJobAd(jobAdId!, newTitle!, newText!);
      this.jobAd.set(await this.jobAdsService.getJobAd(jobAdId!));
    this.jobAdTitle.set(undefined);
    this.jobAdText.set(undefined);
  }


}
