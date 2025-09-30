import {Schwierigkeit} from './domain/schwierigkeit';
import config from '../../assets/config/aufgaben-generator.config.json'
import {ModusTyp} from './domain/modus';
import {AufgabeGenerator} from './aufgabe-generator';
import {Aufgabe} from './domain/aufgabe';
import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {FalscheLoesung, FalscheLoesungenHistory} from './domain/falsche-loesungen-history';
import { createUebungEvent } from './domain/uebung';
import {UebungApiService} from '../api/uebung-api.service';

@Injectable({
  providedIn: 'root'
})
export class UebungService {
  apiService : UebungApiService = inject(UebungApiService);

  modus! :  ModusTyp;
  schwierigkeit! : Schwierigkeit;
  aufgabenGenerator! : AufgabeGenerator;
  timerId : number | undefined = undefined;
  sekunden: WritableSignal<number> = signal(1);

  aktuelleAufgabe : WritableSignal<Aufgabe> = signal({term: "", loesung: 0});
  falscheLoesungenHistory! : FalscheLoesungenHistory;

  uebungStatistik = {
    totalAufgaben: 0,
    korrekteLoesung: 0,
    falscheLoesung: 0
  }

  initService(modus : ModusTyp, schwierigkeit : Schwierigkeit) {
    this.modus = modus;
    this.schwierigkeit = schwierigkeit;
    this.aufgabenGenerator = new AufgabeGenerator(this.modus, this.schwierigkeit);
    this.falscheLoesungenHistory  = new FalscheLoesungenHistory();

    this.initSekunden();
  }

  public uebungStarten() : void {
    this.uebungsaufgabeGenerieren()
    this.timerId = setInterval(() => {
      console.log(`Übung läuft: ${this.sekunden}s`)
      this.sekunden.update(value => value - 1);

      if(this.istUebungBeendet()) {
        this.beendeTimer()
        const uebungEvent = createUebungEvent(
          "testuser",
          this.modus,
          this.schwierigkeit,
          this.uebungStatistik.korrekteLoesung,
          this.uebungStatistik.falscheLoesung
        )
        this.apiService.postUebungEvent(uebungEvent)
      }
    }, 1000)
  }

  public istUebungBeendet() : boolean {
    return this.sekunden() === 0
  }

  public beendeTimer() :void {
    clearInterval(this.timerId);
    this.timerId = undefined;
  }

  public uebungsaufgabeGenerieren() : void {
    this.uebungStatistik.totalAufgaben++;
    this.aktuelleAufgabe.set(this.aufgabenGenerator.generateAufgabe());
  }

  public evaluiereBenutzerLoesung(benutzerLoesung : string) : boolean {
    const loesungAsNumber = parseInt(benutzerLoesung);
    if(this.aktuelleAufgabe().loesung === loesungAsNumber) {
      this.uebungStatistik.korrekteLoesung++;
      return true;
    } else {
      this.uebungStatistik.falscheLoesung++;
      const actualLoesung = this.aktuelleAufgabe().loesung.toString()
      this.falscheLoesungenHistory.pushFalscheLoesung(this.aktuelleAufgabe().term, actualLoesung, benutzerLoesung)
      return false;
    }
  }

  zustandZuruecksetzen() : void {
    this.sekunden.set(1)
    this.uebungStatistik.totalAufgaben = 0
    this.uebungStatistik.korrekteLoesung = 0;
    this.uebungStatistik.falscheLoesung = 0;
    this.aktuelleAufgabe.set({term: "", loesung: 0})
  }

  get aktuellerTerm() :string {
    return this.aktuelleAufgabe().term
  }

  get aktuelleSekunden() : number {
    return this.sekunden()
  }

  get alleFalschenLoesungen() : FalscheLoesung[] {
    return this.falscheLoesungenHistory.alleFalschenLoesungen
  }

  private initSekunden() {
    switch (this.modus) {
      case ModusTyp.ADDITION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.sekunden.set(config.add["0"].uebungszeitSekunden)
            break;
          }
          case Schwierigkeit.MITTEL: {
            this.sekunden.set(config.add["1"].uebungszeitSekunden)
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.sekunden.set(config.add["2"].uebungszeitSekunden)
            break;
          }
        }
        break;
      }
      case ModusTyp.SUBTRAKTION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.sekunden.set(config.sub["0"].uebungszeitSekunden)
            break;
          }
          case Schwierigkeit.MITTEL: {
            this.sekunden.set(config.sub["1"].uebungszeitSekunden)
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.sekunden.set(config.sub["2"].uebungszeitSekunden)
            break;
          }
        }
        break;
      }
      case ModusTyp.MULTIPLIKATION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.sekunden.set(config.mul["0"].uebungszeitSekunden)
            break;
          }
          case Schwierigkeit.MITTEL: {
            this.sekunden.set(config.mul["1"].uebungszeitSekunden)
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.sekunden.set(config.mul["2"].uebungszeitSekunden)
            break;
          }
        }
        break;
      }
      case ModusTyp.DIVISION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.sekunden.set(config.div["0"].uebungszeitSekunden)
            break;
          }
          case Schwierigkeit.MITTEL: {
            this.sekunden.set(config.div["1"].uebungszeitSekunden)
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.sekunden.set(config.div["2"].uebungszeitSekunden)
            break;
          }
        }
        break;
      }

    }

  }
}
