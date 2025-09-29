import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TrainComponent} from './train-component/train-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ng-mathtrain');
}
