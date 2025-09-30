import {Schwierigkeit} from './domain/schwierigkeit';
import config from '../../assets/config/aufgaben-generator.config.json';
import {Injectable} from '@angular/core';
import {Aufgabe} from './domain/aufgabe';
import {ModusTyp} from './domain/modus';

@Injectable({
  providedIn: 'root'
})
export class AufgabeGenerator {
  modus : ModusTyp;
  schwierigkeit : Schwierigkeit;
  numberRange : number[] = [];
  terms : number = -1;

  constructor(modus : ModusTyp,
              schwierigkeit : Schwierigkeit) {
    this.modus = modus;
    this.schwierigkeit = schwierigkeit;
    this.setData();
    this.debugPrint();
  }

  public generateAufgabe() : Aufgabe {

    let terms = this.generateTerms()
    let term : string = "";
    let loesung : number = 0;

    switch (this.modus) {
      case ModusTyp.ADDITION: {
        loesung = terms.reduce((sum, n) => sum + n, 0);
        term = terms.join("+");
        break;
      }
      case ModusTyp.SUBTRAKTION: {
        loesung = terms.slice(1).reduce((diff, n) => diff - n, terms[0]);
        term = terms.join("-");
        break;
      }
      case ModusTyp.MULTIPLIKATION: {
        loesung = terms.reduce((prod, n) => prod * n, 1);
        term = terms.join("*");
      break;
      }
      case ModusTyp.DIVISION: {
        loesung = terms.slice(1).reduce((quot, n) => quot / n, terms[0]);
        term = terms.join("/");
        break;
      }
    }

    return {
      term: term,
      loesung: loesung,
    };
  }

  public generateTerms() : number[] {
    let terms = []
    if(this.modus !== ModusTyp.DIVISION) {
      for(let i = 0; i < this.terms; i++) {
        const number = this.randomInclusive(this.numberRange[0], this.numberRange[1]);
        terms.push(number);
      }
    } else {
      // Könnte eine 0 zufällig generiert werden? Das geschieht nur, wenn das Interval eine linke Schranke <= 0 hat
      if(Math.min(this.numberRange[0], this.numberRange[1]) <= 0) {
        // Es darf keine 0 generiert werden, versuche Numbergeneration im schlechtesten Fall 10x
        let number = 0
        let j = 100
        for(let i = 0; i < this.terms; i++) {
          while(number == 0 && j > 0) {
            number = this.randomInclusive(this.numberRange[0], this.numberRange[1]);
            j--;
          }
          terms.push(number);
        }
        // Falls doch im seltenen Fall eine 0 generiert wurde, setze sie auf [1,10]
        for(let i = 0; i < this.terms; i++) {
          if(terms[i] == 0) terms[i] = this.randomInclusive(1,10);
        }
      } else {
        // 0 kann nicht generiert werden
        const number = this.randomInclusive(this.numberRange[0], this.numberRange[1]);
        terms.push(number);
      }
    }

    return terms;
  }

  public randomInclusive(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getNumberRange() : number[] {
    return this.numberRange;
  }

  getTerms() : number {
    return this.terms;
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
            this.numberRange = config.div["0"].numberRange;
            this.terms = config.div["0"].terms;
            break
          }
          case Schwierigkeit.MITTEL: {
            this.numberRange = config.div["1"].numberRange;
            this.terms = config.div["1"].terms;
            break;
          }
          case Schwierigkeit.SCHWER: {
            this.numberRange = config.div["2"].numberRange;
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
    console.log(this.terms)
  }

}
