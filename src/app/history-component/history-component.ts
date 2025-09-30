import {Component, inject, OnInit} from '@angular/core';
import {UebungApiService} from '../api/uebung-api.service';
import {UebungEvent} from '../train-component/domain/uebung';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-history-component',
  imports: [NgForOf],
  templateUrl: './history-component.html',
  styleUrls: ['./history-component.css', '../debug.css']
})
export class HistoryComponent implements OnInit {
  uebungApiService = inject(UebungApiService)
  uebungEvents : UebungEvent[] = [];

  ngOnInit(): void {
    this.uebungApiService.getAllEvents("testuser").subscribe((events : UebungEvent[]) => {
      console.log(events);
      this.uebungEvents = events;
    })
  }
}
