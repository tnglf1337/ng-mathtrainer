import {AufgabeGenerator} from './aufgabe-generator';
import {ModusTyp} from './domain/modus';
import {Schwierigkeit} from './domain/schwierigkeit';

describe('AufgabenGenerator', () => {
  let aufgabenGenerator : AufgabeGenerator;

  it('wird mit einem ModusTyp.ADDITION und Schwierigkeit korrekt mit den jeweiligen Konfigurationdaten befüllt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.ADDITION, Schwierigkeit.EINFACH)

    const numberRange = aufgabenGenerator.getNumberRange();
    const terms = aufgabenGenerator.getTerms();

    expect(numberRange.length).toEqual(2)
    expect(terms).toBeGreaterThan(-1)
  });

  it('generiert für ModusTyp.Addition und Schwierigkeit.EINFACH ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.ADDITION, Schwierigkeit.EINFACH)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([22,11]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("22+11")
    expect(aufgabe.loesung).toEqual(33);
  });

  it('generiert für ModusTyp.Addition und Schwierigkeit.MITTEL ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.ADDITION, Schwierigkeit.MITTEL)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([10000,10, 66]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("10000+10+66")
    expect(aufgabe.loesung).toEqual(10076);
  });

  it('generiert für ModusTyp.Addition und Schwierigkeit.SCHWER ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.ADDITION, Schwierigkeit.SCHWER)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([10000,99999,10, 22]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("10000+99999+10+22")
    expect(aufgabe.loesung).toEqual(110031);
  });

  it('generiert für ModusTyp.SUBTRAKTION und Schwierigkeit.EIFNACH ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.SUBTRAKTION, Schwierigkeit.EINFACH)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([-20,15]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("-20-15")
    expect(aufgabe.loesung).toEqual(-35);
  });

  it('generiert für ModusTyp.SUBTRAKTION und Schwierigkeit.MITTEL ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.SUBTRAKTION, Schwierigkeit.MITTEL)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([-200,-500,85]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("-200--500-85")
    expect(aufgabe.loesung).toEqual(215);
  });

  it('generiert für ModusTyp.SUBTRAKTION und Schwierigkeit.SCHWER ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.SUBTRAKTION, Schwierigkeit.SCHWER)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([-200,-500,85,215]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("-200--500-85-215")
    expect(aufgabe.loesung).toEqual(0);
  });

  it('generiert für ModusTyp.MULTPILKATION und Schwierigkeit.EINFACH ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.MULTIPLIKATION, Schwierigkeit.EINFACH)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([-3,5]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("-3*5")
    expect(aufgabe.loesung).toEqual(-15);
  });

  it('generiert für ModusTyp.MULTPILKATION und Schwierigkeit.MITTEL ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.MULTIPLIKATION, Schwierigkeit.MITTEL)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([-15,11]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("-15*11")
    expect(aufgabe.loesung).toEqual(-165);
  });

  it('generiert für ModusTyp.MULTPILKATION und Schwierigkeit.SCHWER ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.MULTIPLIKATION, Schwierigkeit.SCHWER)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValues([-20,11,-2]);

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("-20*11*-2")
    expect(aufgabe.loesung).toEqual(440);
  });

  it('generiert für ModusTyp.DIVISION und Schwierigkeit.EINFACH ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.DIVISION, Schwierigkeit.EINFACH)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValue([90,-10])

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("90/-10")
    expect(aufgabe.loesung).toEqual(-9);
  });

  it('generiert für ModusTyp.DIVISION und Schwierigkeit.MITTEL ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.DIVISION, Schwierigkeit.EINFACH)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValue([220,4])

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("220/4")
    expect(aufgabe.loesung).toEqual(55);
  });

  it('generiert für ModusTyp.DIVISION und Schwierigkeit.SCHWER ein korrektes Aufgaben-Objekt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.DIVISION, Schwierigkeit.EINFACH)
    spyOn(aufgabenGenerator as any, 'generateTerms').and.returnValue([500,5,-2])

    const aufgabe = aufgabenGenerator.generateAufgabe()

    expect(aufgabe.term).toEqual("500/5/-2")
    expect(aufgabe.loesung).toEqual(-50);
  });
});
