import {HttpClient} from '@angular/common/http';
import {UebungEvent} from '../train-component/domain/uebung';
import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UebungApiService {
  httpClient : HttpClient = inject(HttpClient);

  BASE_URL = "http://localhost:11000"

  postUebungEvent(event : UebungEvent) : void {
    this.httpClient.post<any>(this.BASE_URL+ "/uebung-event", event).subscribe({})
  }
}
