const { gridToString, compareNumbers, gridParsed } = require('./utils');

function crosswordSolver(puzzle, words) {
    const grid = gridParsed(puzzle);

    let slots = [];

    for (let i = 0; i < grid.length; i++) {
        for (let x = 0; x < grid[i].length; x++) {

            if (grid[i][x] > 0) {
                let directionsFound = 0;

                if (x + 1 < grid[i].length && grid[i][x + 1] !== '.' && (x === 0 || grid[i][x - 1] === '.')) {
                    let length = 0;
                    for (let k = x; k < grid[i].length && grid[i][k] !== '.'; k++) {
                        length++
                    }
                    slots.push({ row: i, col: x, direction: 'H', length: length });
                    directionsFound++;
                }

                if (i + 1 < grid.length && grid[i + 1][x] !== '.' && (i === 0 || grid[i - 1][x] === '.')) {
                    let length = 0;
                    for (let y = i; y < grid.length && grid[y][x] !== '.'; y++) {
                        length++
                    }
                    slots.push({ row: i, col: x, direction: 'V', length: length });
                    directionsFound++;
                }

                if (directionsFound !== Number(grid[i][x])) {
                    return "Error";
                }
            }
        }
    }
    let s = []
    for (let p = 0; p < slots.length; p++) {
        s.push(slots[p].length)
    }
    let s2 = []
    for (let c = 0; c < words.length; c++) {
        s2.push(words[c].length)
    }

    if (slots.length !== words.length) {
        return "Error";
    }
    s.sort(compareNumbers);
    s2.sort(compareNumbers);
    for (let j = 0; j < s.length; j++) {
        if (s[j] !== s2[j]) {
            return "Error";
        }
    }

    const usedWords = new Array(words.length).fill(false);
    const solved = solve(0, usedWords, slots, words, grid);
    if (!solved) {
        return "Error";
    }

    return gridToString(grid);
}

function canPlace(word, slot, grid) {
    if (word.length !== slot.length) return false;
    for (let i = 0; i < word.length; i++) {
        let row, col;
        if (slot.direction === 'H') {
            row = slot.row;
            col = slot.col + i;
        } else {
            row = slot.row + i;
            col = slot.col;
        }

        let cell = grid[row][col];
        if (cell === '.') return false;

        if (cell !== '0' && isNaN(cell)) {
            if (cell !== word[i]) return false;
        }
    }
    return true
}

function placeWord(word, slot, grid) {
    const old = [];
    for (let i = 0; i < word.length; i++) {
        let row, col;
        if (slot.direction === 'H') {
            row = slot.row;
            col = slot.col + i;
        } else {
            row = slot.row + i;
            col = slot.col;
        }

        old.push({ row, col, prev: grid[row][col] });
        grid[row][col] = word[i];
    }
    return old;
}

function removeWord(slot, grid, old) {
    for (let i = 0; i < old.length; i++) {
        const { row, col, prev } = old[i];
        grid[row][col] = prev;
    }
}

function solve(slotindex, usedWords, slots, words, grid) {
    if (slotindex === slots.length) {
        return true;
    }

    const slot = slots[slotindex];

    for (let i = 0; i < words.length; i++) {
        if (usedWords[i]) {
            continue;
        }

        const word = words[i];
        if (!canPlace(word, slot, grid)) {
            continue;
        }

        const old = placeWord(word, slot, grid);
        usedWords[i] = true;

        if (solve(slotindex + 1, usedWords, slots, words, grid)) {
            return true;
        }

        usedWords[i] = false;
        removeWord(slot, grid, old);
    }

    return false;
}

module.exports = crosswordSolver;