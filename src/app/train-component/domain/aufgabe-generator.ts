import {ModusTyp} from './modus';
import {Schwierigkeit} from './schwierigkeit';
import config from '../../../assets/config/aufgaben-generator.config.json';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AufgabeGenerator {
  modus : ModusTyp;
  schwierigkeit : Schwierigkeit;
  numberRange : number[] = [];
  zaehlerRange : number[] = [];
  nennerRange : number[] = [];
  terms : number = -1;

  constructor(modus : ModusTyp,
              schwierigkeit : Schwierigkeit) {
    this.modus = modus;
    this.schwierigkeit = schwierigkeit;
    this.setData();
    this.debugPrint();

  }

  private setData() : void {
    switch (this.modus) {
      case ModusTyp.ADDITION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.numberRange = config.add["0"].numberRange;
            this.terms = config.add["0"].terms;
            break
          }
          case Schwierigkeit.MITTEL: {
            this.numberRange = config.add["1"].numberRange;
            this.terms = config.add["1"].terms;
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.numberRange = config.add["2"].numberRange;
            this.terms = config.add["2"].terms;
            break;
          }
        }
        break;
      }
      case ModusTyp.SUBTRAKTION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.numberRange = config.sub["0"].numberRange;
            this.terms = config.sub["0"].terms;
            break
          }
          case Schwierigkeit.MITTEL: {
            this.numberRange = config.sub["1"].numberRange;
            this.terms = config.sub["1"].terms;
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.numberRange = config.sub["2"].numberRange;
            this.terms = config.sub["2"].terms;
            break;
          }
        }
        break;
      }
      case ModusTyp.MULTIPLIKATION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.numberRange = config.mul["0"].numberRange;
            this.terms = config.mul["0"].terms;
            break
          }
          case Schwierigkeit.MITTEL: {
            this.numberRange = config.mul["1"].numberRange;
            this.terms = config.mul["1"].terms;
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.numberRange = config.mul["2"].numberRange;
            this.terms = config.mul["2"].terms;
            break;
          }
        }
        break;
      }
      case ModusTyp.DIVISION: {
        switch (this.schwierigkeit) {
          case Schwierigkeit.EINFACH: {
            this.zaehlerRange = config.div["0"].zaehlerRange;
            this.nennerRange = config.div["0"].nennerRange;
            this.terms = config.div["0"].terms;
            break
          }
          case Schwierigkeit.MITTEL: {
            this.zaehlerRange = config.div["1"].zaehlerRange;
            this.nennerRange = config.div["1"].nennerRange;
            this.terms = config.div["1"].terms;
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.zaehlerRange = config.div["2"].zaehlerRange;
            this.nennerRange = config.div["2"].nennerRange;
            this.terms = config.div["2"].terms;
            break;
          }
        }
        break;
      }
    }
  }

  private debugPrint() : void {
    console.log("init generator with config:")
    console.log(this.numberRange)
    console.log(this.zaehlerRange)
    console.log(this.nennerRange)
    console.log(this.terms)
  }

}
