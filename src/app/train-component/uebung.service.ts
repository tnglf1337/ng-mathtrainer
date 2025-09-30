import {Schwierigkeit} from './domain/schwierigkeit';
import config from '../../assets/config/aufgaben-generator.config.json'
import {ModusTyp} from './domain/modus';
import {AufgabeGenerator} from './aufgabe-generator';
import {Aufgabe} from './domain/aufgabe';

export class UebungService {
  modus :  ModusTyp;
  schwierigkeit : Schwierigkeit;
  aufgabenGenerator : AufgabeGenerator;
  timerId : number | undefined = undefined;
  sekunden : number = 1;

  aktuelleAufgabe : Aufgabe = {} as Aufgabe;
  uebungStatistik = {
    totalAufgaben: 0,
    korrekteLoesung: 0,
    falscheLoesung: 0
  }

  constructor(
    modus :  ModusTyp,
    schwierigkeit : Schwierigkeit)
  {
    this.modus = modus;
    this.schwierigkeit  = schwierigkeit;
    this.aufgabenGenerator = new AufgabeGenerator(this.modus, this.schwierigkeit);

    this.initSekunden();
  }

  public uebungStarten() : void {
    this.timerId = setInterval(() => {
      console.log(`Übung läuft: ${this.sekunden}s`)
      this.sekunden--

      if(this.istUebungBeendet()) this.beendeTimer()

    }, 1000)
  }

  public istUebungBeendet() : boolean {
    return this.sekunden == 0
  }

  public beendeTimer() :void {
    clearInterval(this.timerId);
    this.timerId = undefined;
  }

  public uebungsaufgabeGenerieren() : void {
    this.uebungStatistik.totalAufgaben++;
    this.aktuelleAufgabe = this.aufgabenGenerator.generateAufgabe();
  }

  public evaluiereBenutzerLoesung(benutzerLoesung : string) : boolean {
    const loesungAsNumber = parseInt(benutzerLoesung);
    if(this.aktuelleAufgabe.loesung === loesungAsNumber) {
      this.uebungStatistik.korrekteLoesung++;
      return true;
    } else {
      this.uebungStatistik.falscheLoesung++;
      return false;
    }
  }

  zustandZuruecksetzen() : void {
    this.sekunden = 1;
    this.uebungStatistik.totalAufgaben = 0
    this.uebungStatistik.korrekteLoesung = 0;
    this.uebungStatistik.falscheLoesung = 0;
    this.aktuelleAufgabe = {} as Aufgabe;
  }

  get postGameStatistik() : number[] {
    return [
      this.uebungStatistik.totalAufgaben,
      this.uebungStatistik.korrekteLoesung,
      this.uebungStatistik.falscheLoesung
    ];
  }

  private initSekunden() {
    switch (this.modus) {
      case ModusTyp.ADDITION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.sekunden = config.add["0"].uebungszeitSekunden
            break;
          }
          case Schwierigkeit.MITTEL: {
            this.sekunden = config.add["1"].uebungszeitSekunden
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.sekunden = config.add["2"].uebungszeitSekunden
            break;
          }
        }
        break;
      }
      case ModusTyp.SUBTRAKTION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.sekunden = config.add["0"].uebungszeitSekunden
            break;
          }
          case Schwierigkeit.MITTEL: {
            this.sekunden = config.add["1"].uebungszeitSekunden
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.sekunden = config.add["2"].uebungszeitSekunden
            break;
          }
        }
        break;
      }
      case ModusTyp.MULTIPLIKATION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.sekunden = config.add["0"].uebungszeitSekunden
            break;
          }
          case Schwierigkeit.MITTEL: {
            this.sekunden = config.add["1"].uebungszeitSekunden
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.sekunden = config.add["2"].uebungszeitSekunden
            break;
          }
        }
        break;
      }
      case ModusTyp.DIVISION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.sekunden = config.add["0"].uebungszeitSekunden
            break;
          }
          case Schwierigkeit.MITTEL: {
            this.sekunden = config.add["1"].uebungszeitSekunden
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.sekunden = config.add["2"].uebungszeitSekunden
            break;
          }
        }
        break;
      }

    }

  }
}
