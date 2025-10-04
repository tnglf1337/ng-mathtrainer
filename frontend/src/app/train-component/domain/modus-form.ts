import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {ModusTyp} from './modus';

@Injectable({
  providedIn: 'root',
})
export class ModusForm {
  form = new FormGroup({
    modus: new FormControl<ModusTyp>(ModusTyp.ADDITION, Validators.required),
  })

  getForm() : FormGroup {
    return this.form;
  }

  getModus() : ModusTyp {
    return this.form.get("modus")?.value as ModusTyp;
  }

}
