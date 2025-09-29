import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TrainComponent} from './train-component/train-component';

@Component({
  selector: 'app-root',
  imports: [TrainComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css', 'debug.css']
})
export class App {
  protected readonly title = signal('ng-mathtrain');
}
