import { Pipe, PipeTransform } from '@angular/core';
import {ModusTyp} from '../train-component/domain/modus';

@Pipe({
  name: 'modusTransform',
  standalone: true,
  pure: true
})
export class ModusPipe implements PipeTransform {
  transform(modus: number | string | null | undefined): string {
    switch (modus) {
      case ModusTyp.ADDITION.toString(): return "Addition"
      case ModusTyp.SUBTRAKTION.toString(): return "Subtraktion"
      case ModusTyp.MULTIPLIKATION.toString(): return "Multipliktion"
      case ModusTyp.DIVISION.toString(): return "Division"
      case ModusTyp.GEMISCHT.toString(): return "Gemischt"
      default: return "Addition"
    }
  }
}
