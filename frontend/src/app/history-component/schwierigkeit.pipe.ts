import { Pipe, PipeTransform } from '@angular/core';
import {Schwierigkeit} from '../train-component/domain/schwierigkeit';

@Pipe({
  name: 'schwierigkeitTransform',
  standalone: true,
  pure: true
})
export class SchwierigkeitPipe implements PipeTransform {
  transform(schwierigkeit: number | string | null | undefined): string {
    switch (schwierigkeit) {
      case Schwierigkeit.EINFACH.toString(): return "einfach"
      case Schwierigkeit.MITTEL.toString(): return "mittel"
      case Schwierigkeit.SCHWER.toString(): return "schwer"
      default: return "Einfach"
    }
  }
}
