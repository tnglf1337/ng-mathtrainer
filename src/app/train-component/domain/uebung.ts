import {ModusTyp} from './modus';
import {Schwierigkeit} from './schwierigkeit';

export interface UebungEvent {
  eventid : string;
  beendetAm : Date;
  username : string;
  modus : ModusTyp;
  schwierigkeit : Schwierigkeit;
  korrektLoesungen : number;
  falscheLoesungen : number;
}
