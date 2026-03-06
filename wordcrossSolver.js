const { gridParsed } = require('./index.js');

function crosswordSolver(puzzle, words) {
    const grid = gridParsed(puzzle);
    
    let slots = [];
    
    for (let i = 0; i < grid.length; i++) {
        for (let x = 0; x < grid[i].length; x++) {
            if (grid[i][x] > 0) {
                let directionsFound = 0;
                
                if (x+1 < grid[i].length && grid[i][x+1] !== '.') {
                    let length = 0;
                    for (let k = x; k < grid[i].length && grid[i][k] !== '.'; k++) {
                        length++
                    } 
                    slots.push({ row: i, col: x, direction: 'H', length: length });
                    directionsFound++;
                }
                
                if (i+1 < grid.length && grid[i+1][x] !== '.') {
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
    s.sort((a, b) => a - b);
    s2.sort((a, b) => a - b);
    for (let j = 0; j < s.length; j++) {
        if (s[j] !== s2[j]) {
            return "Error"; 
        }
    }
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

function removeWord(slot, grid, old) {

}

function solve(slotindex, usedWords) {

}