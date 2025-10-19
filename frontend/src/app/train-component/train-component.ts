import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ModusForm} from './domain/modus-form';
import {SchwierigkeitForm} from './domain/schwierigkeit-form';
import {ModusTyp} from './domain/modus';
import {Schwierigkeit} from './domain/schwierigkeit';
import {UebungService} from './uebung.service';
import {NgForOf, NgIf} from '@angular/common';
import { SekundenToHmsPipe } from '../sekunden-anzeige.pipe'

@Component({
  selector: 'app-train-component',
  imports: [ReactiveFormsModule, NgIf, NgForOf, SekundenToHmsPipe],
  standalone: true,
  templateUrl: './train-component.html',
  styleUrls: ['./train-component.css', '../debug.css']
})
export class TrainComponent {

  uebungService : UebungService = inject(UebungService);
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
    this.uebungService.initService(gewaehlterModus, gewaehlteSchwierigkeit);
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

  get totaleAufgaben() : number  {
    const n = this.korrekteLoesungen + this.falscheLoesungen
    return n
  }

  get korrekteLoesungen() : number {
    return this.uebungService.uebungStatistik.korrekteLoesung
  }

  get falscheLoesungen() : number {
    return this.uebungService.uebungStatistik.falscheLoesung
  }

  protected readonly ModusTyp = ModusTyp;
  protected readonly Schwierigkeit = Schwierigkeit;
}
