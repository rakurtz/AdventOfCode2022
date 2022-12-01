#!/usr/bin/env node

const fs = require('fs');
const data = fs.readFileSync('day01_input.txt').toString().split('\n');

let highscore = { elve: 0, score: 0 }
let arrayOfScores = []
let blocksum = 0
let lastEmptyIndex = 0

const checkHighScore_part1 = () => {
    if (blocksum > highscore.score) {
        highscore.elve = lastEmptyIndex + 1
        highscore.score = blocksum
    }
}

const getSumOfTopThree = () => {
    // sort array
    arrayOfScores.sort(function(a, b){
        return a - b;
    });
    console.log(arrayOfScores);

    // sum last three (highest)
    return arrayOfScores.slice(-3).reduce( (a,b) =>  {
        return a + b;
    });

}

data.forEach( (element, index) => {
    if (element != "") {
        blocksum += parseInt(element)
    } else {
        checkHighScore_part1()
        arrayOfScores.push(blocksum) // for part 2
        blocksum = 0
        lastEmptyIndex = index
    }
    
})

console.log("Part 1:")
console.log("Winning elve: " + highscore.elve + " with score of: " + highscore.score);
console.log("Part 2:")
console.log("Total calories carried by top 3 elves: " + getSumOfTopThree())
