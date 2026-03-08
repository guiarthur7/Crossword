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

function validatePuzzle(puzzle) {
    const lines = puzzle.split('\n');
    if (lines.length === 0 || (lines.length === 1 && lines[0].length === 0)) {
        return 'Grille vide.';
    }

    const width = lines[0].length;
    if (width === 0) {
        return 'Premiere ligne vide.';
    }

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length !== width) {
            return 'Toutes les lignes de la grille doivent avoir la meme longueur.';
        }

        for (let j = 0; j < lines[i].length; j++) {
            const ch = lines[i][j];
            const isDigit = ch >= '0' && ch <= '9';
            if (!isDigit && ch !== '.') {
                return 'Caractere invalide dans la grille: utilise seulement des chiffres et des points.';
            }
        }
    }

    return null;
}

rl.question('Entre la grille (utilise \\n entre les lignes): ', function (rawPuzzle) {
    rl.question('Entre les mots (format: mot1, mot2, mot3): ', function (rawWords) {
        const puzzle = rawPuzzle.replace(/\\n/g, '\n');
        const words = parseWords(rawWords);

        const validationError = validatePuzzle(puzzle);
        if (validationError) {
            console.log('Erreur de saisie:', validationError);
            rl.close();
            return;
        }

        if (words.length === 0) {
            console.log('Erreur de saisie: ajoute au moins un mot.');
            rl.close();
            return;
        }

        const result = crosswordSolver(puzzle, words);
        if (result === 'Error') {
            console.log('Error (grille/mots incompatibles).');
        } else {
            console.log(result);
        }

        rl.close();
    });
});