import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModusForm} from './domain/modus-form';
import {SchwierigkeitForm} from './domain/schwierigkeit-form';
import {ModusTyp} from './domain/modus';
import {Schwierigkeit} from './domain/schwierigkeit';

@Component({
  selector: 'app-train-component',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './train-component.html',
  styleUrls: ['./train-component.css', '../debug.css']
})
export class TrainComponent {

  loesungForm : FormGroup = new FormGroup({
    loesung: new FormControl("", Validators.required),
  })

  constructor(
    protected modusForm: ModusForm,
    protected schwierigkeitForm : SchwierigkeitForm) {}

  evaluiereLoesung($event: KeyboardEvent) {
    const loesung = this.getLoesung($event);
  }

  uebungStarten() {
    const gewaehlterModus = this.modusForm.getModus();
    const gewaehlteSchwierigkeit = this.schwierigkeitForm.getSchwierigkeit();

  }

  private getLoesung($event: KeyboardEvent) : number {
    if ($event.key === 'Enter') {
      const loesung = this.loesungForm.get("loesung")?.value
      return parseInt(loesung);
    } else {
      return 0
    }
  }

  protected readonly ModusTyp = ModusTyp;
  protected readonly Schwierigkeit = Schwierigkeit;
}
