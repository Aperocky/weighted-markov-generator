import { assert } from 'chai';
import { SeedBlob, SeedDictionary } from '../src/markov/seedDictionary';
import { WeightedMarkovGenerator } from '../src/markov/generator';


describe('markov:seedDictionary', () => {
    it('test seeding with basic string', () => {
        let testString = "aaabac";
        let sd = new SeedDictionary(3);
        sd.populateDictionary(testString);
        let sdict = sd.dict;
        assert(sdict.has("aba"));
        let abablob = sdict.get("aba");
        assert(abablob.count == 1);
        assert(Array.from(abablob.countMap.keys())[0] == "c");
        assert(Array.from(abablob.countMap.values())[0] == 1);
        assert(abablob.countMap.size == 1);

        let ablob = sdict.get("a");
        assert(ablob.count == 4);
        assert(ablob.countMap.size == 3);
        assert(ablob.countMap.get("a") == 2);

        let val = sd.getValue("a");
        assert(["a", "b", "c"].includes(val));
    });
})

describe('markov:weightedMarkovGenerator', () => {
    it('test generation with small string', () => {
        let testString = "mary is a little lambda";
        let mtg = new WeightedMarkovGenerator(3);
        mtg.seedText(testString);
        let gen = mtg.generateText(30);
        assert(gen.length == 30);
        gen = mtg.generateText(30, "shai");
        assert(gen.length == 30);
    });
});
