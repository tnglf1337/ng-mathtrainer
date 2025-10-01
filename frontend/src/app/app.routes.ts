import { Routes } from '@angular/router';
import {TrainComponent} from './train-component/train-component';
import {HistoryComponent} from './history-component/history-component';

export const routes: Routes = [
  {
    path: 'uebung',
    component: TrainComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  }
];
