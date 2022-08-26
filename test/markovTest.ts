import { assert, expect } from 'chai';
import { SeedDictionary } from '../src/markov/seedDictionary';
import { WeightedMarkovGenerator } from '../src/markov/generator';


let CHAR_STRING = `    话说天下大势，分久必合，合久必分。周末七国分争，并入于秦。及秦灭之后，楚、汉分争，又并入于汉。汉朝自高祖斩白蛇而起义，一统天下，后来光武中兴，传至献帝，遂分为三国。推其致乱之由，殆始于桓、灵二帝。桓帝禁锢善类，崇信宦官。及桓帝崩，灵帝即位，大将军窦武、太傅陈蕃，共相辅佐。时有宦官曹节等弄权，窦武、陈蕃谋诛之，机事不密，反为所害，中涓自此愈横。`

let AMENDMENTS = "Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances. A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed. No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law."

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

    it("test seeding with 13th century novel", () => {
        let sd = new SeedDictionary(2);
        sd.populateDictionary(CHAR_STRING);
    });
})

describe('markov:weightedMarkovGenerator', () => {
    it('test generation with small string', () => {
        let testString = "mary is a little lambda";
        let mtg = new WeightedMarkovGenerator(3);
        mtg.seedText(testString);
        let generatedText = mtg.generateText(30);
        assert(generatedText.length == 30);
        generatedText = mtg.generateText(30, "shai");
        assert(generatedText.length == 30);
    });

    it('test generation with 13th century novel', () => {
        let mtg = new WeightedMarkovGenerator(2);
        mtg.seedText(CHAR_STRING);
        let generatedText = mtg.generateText(30);
        assert(generatedText.length == 30);
    });

    it('test generation with endsOn param', () => {
        let mtg = new WeightedMarkovGenerator(3);
        mtg.seedText(AMENDMENTS);
        let generatedText = mtg.generateText(100, "Let it be known that ", ".");
        assert(generatedText.length > 100);
        if (generatedText.length < 200) {
            assert(generatedText.endsWith("."));
        } else {
            assert(!generatedText.endsWith("."));
        }
        assert(generatedText.startsWith("Let it be known that "));
    });

    it('test endsOn param edge cases', () => {
        let mtg = new WeightedMarkovGenerator(3);
        mtg.seedText(AMENDMENTS);
        expect(() => mtg.generateText(100, "", "tooLong")).to.throw("endsOn length cannot exceed seed length");
        expect(() => mtg.generateText(100, "", "zzz")).to
            .throw("endsOn are not in the seed files, cannot end on phrase provided");
    });
});
