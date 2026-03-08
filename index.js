const crosswordSolver = require('./wordcrossSolver');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function parseWords(input) {
    let parts = input.split(',');
    let words = [];

    for (let i = 0; i < parts.length; i++) {
        let w = parts[i].trim();
        if (w.length > 0) {
            words.push(w);
        }
    }

    return words;
}

rl.question('Entre la grille (utilise \\n entre les lignes): ', function (rawPuzzle) {
    rl.question('Entre les mots (format: mot1, mot2, mot3): ', function (rawWords) {
        const puzzle = rawPuzzle.replace(/\\n/g, '\n');
        const words = parseWords(rawWords);

        const result = crosswordSolver(puzzle, words);
        console.log(result);

        rl.close();
    });
});