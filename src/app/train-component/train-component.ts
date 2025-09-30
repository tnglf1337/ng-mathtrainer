import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModusForm} from './domain/modus-form';
import {SchwierigkeitForm} from './domain/schwierigkeit-form';
import {ModusTyp} from './domain/modus';
import {Schwierigkeit} from './domain/schwierigkeit';
import {UebungService} from './uebung.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-train-component',
  imports: [ReactiveFormsModule, NgIf],
  standalone: true,
  templateUrl: './train-component.html',
  styleUrls: ['./train-component.css', '../debug.css']
})
export class TrainComponent {

  uebungService! : UebungService;
  istUebungGestartet : boolean = false;

  loesungForm : FormGroup = new FormGroup({
    loesung: new FormControl("", Validators.required),
  })

  constructor(
    protected modusForm: ModusForm,
    protected schwierigkeitForm : SchwierigkeitForm) {}

  evaluiereLoesung($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      const loesung = this.getLoesung();
      this.uebungService.evaluiereBenutzerLoesung(loesung)
      this.uebungService.uebungsaufgabeGenerieren();
      this.loesungForm.reset()
    }
  }

  uebungStarten() {
    const gewaehlterModus = this.modusForm.getModus();
    const gewaehlteSchwierigkeit = this.schwierigkeitForm.getSchwierigkeit();
    this.uebungService = new UebungService(gewaehlterModus, gewaehlteSchwierigkeit);
    this.uebungService.uebungStarten()
    this.istUebungGestartet = true
  }

  uebungAbbrechen() {
    this.uebungService.beendeTimer()
    this.uebungService.zustandZuruecksetzen()
    this.istUebungGestartet = false
  }

  private getLoesung() : string {
    return this.loesungForm.get("loesung")?.value;
  }

  protected readonly ModusTyp = ModusTyp;
  protected readonly Schwierigkeit = Schwierigkeit;
}
