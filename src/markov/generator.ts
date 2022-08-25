import { SeedDictionary } from './seedDictionary';

export class WeightedMarkovGenerator {

    seedLength: number;
    seedDictionary: SeedDictionary;

    constructor(seedLength: number = 4) {
        this.seedLength = seedLength;
        this.seedDictionary = new SeedDictionary(seedLength);
    }

    // Reset seed length, this forgets all seed text
    setSeedLength(seedLength: number): void {
        this.seedLength = seedLength;
        this.seedDictionary = new SeedDictionary(this.seedLength);
    }

    seedText(text: string): void {
        this.seedDictionary.populateDictionary(text);
    }

    generateText(textLength: number, start: string = ""): string {
        if (start == "") {
            start = this.seedDictionary.getRandomSeed();
        }
        let currLength = start.length;
        let currText = start;
        while (currText.length < textLength) {
            let csl = this.seedLength;
            if (csl > currText.length) {
                csl = currText.length;
            }
            let seedFound = false;
            while (csl >= 1) {
                let seed = currText.slice(-csl);
                if (this.seedDictionary.hasSeed(seed)) {
                    let val = this.seedDictionary.getValue(seed);
                    currText += val;
                    seedFound = true;
                    break;
                }
                csl--;
            }
            if (!seedFound) {
                // Unable to find seed, returning a truncated version.
                return currText;
            }
        }
        return currText;
    }
}
