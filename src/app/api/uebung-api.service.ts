import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {UebungEvent} from '../train-component/domain/uebung';

export class UebungApiService {
  httpClient : HttpClient = inject(HttpClient);

  postUebungEvent(event : UebungEvent) : void {
    this.httpClient.post<any>("ENDPOINT", event).subscribe({})
  }
}
