// Weighted markov seed dictionary

export class SeedBlob {
    
    count: number;
    countMap: Map<string, number>;

    constructor() {
        this.count = 0;
        this.countMap = new Map();
    }

    addValue(val: string): void {
        this.count++;
        if (this.countMap.has(val)) {
            this.countMap.set(val, this.countMap.get(val) + 1);
        } else {
            this.countMap.set(val, 1);
        }
    }

    getWeightedValue(): string {
        let rng = Math.random();
        let currSum = 0;
        for (const [val, num] of this.countMap) {
            currSum += num;
            if ((currSum/this.count) > rng) {
                return val;
            }
        }
    }
}


export class SeedDictionary {

    seedLength: number;
    dict: Map<string, SeedBlob>;

    constructor(seedLength: number) {
        // Seed length refers to max seed length.
        this.seedLength = seedLength;
        this.dict = new Map();
    }

    populateDictionary(text: string): void {
        // Populate dictionary from 1 to seed length
        for (let csl = 1; csl <= this.seedLength; csl++) {
            let idx = 0;
            while (idx + csl < text.length) {
                let currKey = text.slice(idx, idx + csl);
                let currVal = text[idx + csl];
                if (this.dict.has(currKey)) {
                    let seedBlob = this.dict.get(currKey);
                    seedBlob.addValue(currVal);
                } else {
                    let seedBlob = new SeedBlob();
                    seedBlob.addValue(currVal);
                    this.dict.set(currKey, seedBlob);
                }
                idx += 1;
            }
        }
    }

    getRandomSeed(): string {
        let keys = Array.from(this.dict.keys())
        return keys[Math.floor(Math.random() * keys.length)];
    }

    hasSeed(seed: string): boolean {
        return this.dict.has(seed);
    }

    getValue(seed: string): string {
        if (!this.dict.has(seed)) {
            throw new Error("No seed found!");
        }
        return this.dict.get(seed).getWeightedValue();
    }

    clearDictionary(): void {
        this.dict = new Map();
    }
}
