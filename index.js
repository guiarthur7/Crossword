module.exports = { gridParsed, split };

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Entrer votre grille ? ", function(grid) {
    rl.question("Quels sont vos mots ? (format exact : mot1, mot2, mot3). ", function(word) {
        const words = split(word);
        console.log(`${grid}, contient les mots : ${words.join(", ")}`);
        rl.close();
    });
});
rl.on("close", function() {
    console.log("\nAu revoir !");
    process.exit(0);
})


function split(str) {
    let result = [];
    let separator = ",";
    let word = "";
    for (let i = 0 ; i < str.length; i++) {
        if (str[i] === separator) {
            result.push(word);
            word = "";
            i++
        } else {
            word += str[i];
        }
    }
    result.push(word);
    return result;
}

function gridParsed(puzzle) {
    const lines = puzzle.split('\n');
    let res = [];
    for (let i = 0; i < lines.length; i++) {
        res.push(lines[i].split('')); 
    }
    return res; 
}