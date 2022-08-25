## weighted-markov-generator

Implementation of weighted markov generator in typescript.

    npm -i weighted-markov-generator

Use in typescript/ES6:

    import { WeightedMarkovGenerator } from 'weighted-markov-generator';

node.js:

    const WeightedMarkovGenerator = require("weighted-markov-generator").WeightedMarkovGenerator;

Use:

    let generator = WeightedMarkovGenerator(5) // max length of chain
    generator.seedText(NAVY_SEAL_COPYPASTA); // Seeding with well known sample text
    let text = generator.generateText(200, "I declare");

    // text (randomly generated example):
    I declare for the contacting my secret raids on Al-Quaeda, and I will drown in it. You are nothing to me but I have held your IP is being that shit If only you would have held you didn't

Generally, longer max lenght is associated with more coherence based off seed text. There are other word based markov chains, this is character based and should work reasonably well with other languages as well.
