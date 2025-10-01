import {ModusTyp} from './modus';
import {Schwierigkeit} from './schwierigkeit';
import { v4 as uuidv4 } from 'uuid';


export interface UebungEvent {
  eventId : string;
  beendetAm : string;
  username : string;
  modus : ModusTyp;
  schwierigkeit : Schwierigkeit;
  korrektLoesungen : number;
  falscheLoesungen : number;
}

export function createUebungEvent(
  username : string,
  modus : ModusTyp,
  schwierigkeit : Schwierigkeit,
  korrektLoesungen : number,
  falscheLoesungen : number) : UebungEvent {
  const eventId = uuidv4();
  const beendetAm = new Date().toISOString();
  return {
    eventId: eventId,
    beendetAm: beendetAm,
    username: username,
    modus: modus,
    schwierigkeit: schwierigkeit,
    korrektLoesungen: korrektLoesungen,
    falscheLoesungen: falscheLoesungen
  }

}
