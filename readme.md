## weighted-markov-generator

![NPM Version](https://badge.fury.io/js/weighted-markov-generator.svg) &nbsp; ![Unit Test](https://github.com/Aperocky/weighted-markov-generator/workflows/UnitTests/badge.svg)

Implementation of weighted markov generator in typescript.

    npm -i weighted-markov-generator

See example implementation and demo in webpage: https://aperocky.com/markov/

Use in typescript/ES6:

    import { WeightedMarkovGenerator } from 'weighted-markov-generator';

node.js:

    const WeightedMarkovGenerator = require("weighted-markov-generator").WeightedMarkovGenerator;

Example:

    let generator = WeightedMarkovGenerator(5) // max length of chain
    generator.seedText(NAVY_SEAL_COPYPASTA); // Seeding with well known sample text
    let text = generator.generateText(100, "I declare", ".");

    // text (randomly generated example):
    I declare and you couldn't, you would have held you would have over the **** did you little thing you call you can get away with saying tongue.

`generateText` function signature:

    generateText(textLength: number, start: string = "", endsOn: string = ""): string {

Generally, longer max lenght is associated with more coherence based off seed text. There are other word based markov chains, this is character based and should work reasonably well with other languages as well.
