import {AufgabeGenerator} from './aufgabe-generator';
import {ModusTyp} from './domain/modus';
import {Schwierigkeit} from './domain/schwierigkeit';

describe('AufgabenGenerator', () => {
  let aufgabenGenerator : AufgabeGenerator;

  it('wird mit einem ModusTyp und Schwierigkeit korrekt mit den jeweiligen Konfigurationdaten befüllt', () => {
    aufgabenGenerator = new AufgabeGenerator(ModusTyp.ADDITION, Schwierigkeit.EINFACH)

    const numberRange = aufgabenGenerator.getNumberRange();
    const terms = aufgabenGenerator.getTerms();

    expect(numberRange.length).toBeGreaterThan(0);
    expect(terms).toBeGreaterThan(-1)
  });
});
