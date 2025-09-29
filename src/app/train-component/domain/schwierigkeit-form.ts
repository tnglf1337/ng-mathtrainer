import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Schwierigkeit} from './schwierigkeit';
import {ModusTyp} from './modus';

@Injectable({
  providedIn: 'root',
})
export class SchwierigkeitForm {
  form = new FormGroup({
    schwierigkeit: new FormControl<Schwierigkeit>(Schwierigkeit.EINFACH, Validators.required),
  })

  getForm() : FormGroup {
    return this.form;
  }

  getSchwierigkeit() : Schwierigkeit {
    return this.form.get("schwierigkeit")?.value as Schwierigkeit;
  }
}
