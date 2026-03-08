function gridToString(grid) {
    let result = "";
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            result += grid[i][j];
        }
        if (i < grid.length - 1) {
            result += "\n";
        }
    }
    return result;
}

function compareNumbers(a, b) {
    return a - b;
}

function gridParsed(puzzle) {
    const lines = puzzle.split('\n');
    let res = [];
    for (let i = 0; i < lines.length; i++) {
        res.push(lines[i].split(''));
    }
    return res;
}

module.exports = {
    gridToString,
    compareNumbers,
    gridParsed
};