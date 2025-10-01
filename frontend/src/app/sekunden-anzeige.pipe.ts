import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sekundenToHms',
  standalone: true,
  pure: true
})
export class SekundenToHmsPipe implements PipeTransform {
  transform(input: number | string | null | undefined): string {
    if (input === null || input === undefined || input === '') {
      return '0s';
    }

    const totalSeconds = typeof input === 'string' ? Number(input) : Number(input);

    if (!isFinite(totalSeconds) || totalSeconds < 0) {
      return '0s';
    }

    const secs = Math.floor(totalSeconds);

    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join(' ');
  }
}
