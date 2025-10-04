import {HttpClient} from '@angular/common/http';
import {UebungEvent} from '../train-component/domain/uebung';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UebungApiService {
  httpClient : HttpClient = inject(HttpClient);

  BASE_URL = "http://localhost:11000"

  getAllEvents(username : string) : Observable<UebungEvent[]> {
    return this.httpClient.get<UebungEvent[]>(this.BASE_URL + "/find-events-by-username/" + username)
  }

  postUebungEvent(event : UebungEvent) : void {
    this.httpClient.post<any>(this.BASE_URL+ "/uebung-event", event).subscribe({})
  }
}
