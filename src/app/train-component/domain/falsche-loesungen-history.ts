interface FalscheLoesung {
  term : string;
  expectedLoesung : string;
  actualLoesung : string;
}

export class FalscheLoesungenHistory {
  private falscheLoesungen : FalscheLoesung[] = []

  pushFalscheLoesung(term : string, expectedLoesung : string, actualLoesung : string) {
    this.falscheLoesungen.push({
      term: term,
      expectedLoesung: expectedLoesung,
      actualLoesung: actualLoesung
    })
  }

  get alleFalschenLoesungen() : FalscheLoesung[] {
    return this.falscheLoesungen
  }
}
