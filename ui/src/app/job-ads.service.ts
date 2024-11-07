import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type JobAd = {
  "title": string,
  "textEN": string,
  "id": number,
  "translations": [
    {
      "translation": string,
      "translatedText": string
    }
  ]
}


@Injectable({
  providedIn: 'root'
})
export class JobAdsService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  public getJobAds(): Promise<JobAd[]> {
    return firstValueFrom(this.httpClient.get<JobAd[]>(`${this.baseUrl}/ads`));
  }

  public deleteJobAd(jobAdId: number): Promise<void> {
    return firstValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/ads/${jobAdId}`))
  }

  public getJobAd(jobAdId: number): Promise<JobAd> {
    return firstValueFrom(this.httpClient.get<JobAd>(`${this.baseUrl}/ads/${jobAdId}`));
  }

  public updateJobAd(jobAdId: number, newTitle: string, newText: string): Promise<void> {
    return firstValueFrom(this.httpClient.patch<void>(`${this.baseUrl}/ads/${jobAdId}`, { title: newTitle, textEN: newText }));
  }

}
