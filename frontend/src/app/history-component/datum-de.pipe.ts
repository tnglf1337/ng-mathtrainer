import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'datumDe',
  standalone: true,
  pure: true
})
export class DatumDePipe implements PipeTransform {
  transform(isoString: string | null | undefined): string {
    if (isoString === null || isoString === undefined || isoString === '') {
      return 'error deutsch-de pipe';
    }

    const date = new Date(isoString);

    return date.toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }
}
