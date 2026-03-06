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
    
    // ← ICI : Après les boucles, tu as tous tes emplacements dans 'slots'
    // Passer à l'ÉTAPE 3
}