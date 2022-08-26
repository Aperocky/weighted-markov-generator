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

    generateText(textLength: number, start: string = "", endsOn: string = ""): string {
        if (endsOn.length > this.seedLength) {
            throw new Error("endsOn length cannot exceed seed length");
        }
        if (endsOn != "" && !this.seedDictionary.hasSeed(endsOn)) {
            throw new Error("endsOn are not in the seed files, cannot end on phrase provided");
        }
        if (start == "") {
            start = this.seedDictionary.getRandomSeed();
        }
        let currLength = start.length;
        let currText = start;
        while (true) {
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

            // Process endsOn
            if (currText.length >= textLength) {
                if (endsOn.length > 0) {
                    if (currText.length >= 2 * textLength) {
                        return currText;
                    }
                    if (endsOn != currText.slice(-endsOn.length)) {
                        continue;
                    }
                }
                return currText;
            }
        }
    }
}
