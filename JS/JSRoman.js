//Problem: https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/roman-numeral-converter

const VALUE_TO_LITERALS = new Map(Object.entries({
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M",
}));

const LITERAL_TO_VALUE = new Map(Object.entries({
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
}));

const DIFF_PAIR = new Map(Object.entries({
    "M" : "C",
    "D" : "C",
    "C" : "X",
    "L" : "X",
    "X" : "I",
    "V" : "I"
}));

function getClosestLiterals(num) {
    let lower = {}, higher= {};

    if(num>=1000) {
        return [lower, {value: 1000, literal:"M"}];
    }

    for (let [key, value] of VALUE_TO_LITERALS) {
        if ((num / key) > 1) {
            lower.value = key;
            lower.literal = value;
        } else {
            higher.value = key;
            higher.literal = value;
            break;
        }
    }

    return [lower, higher];
}

function getRoman(num) {
    let [lower, higher] = getClosestLiterals(num);

    let roman = "";

    if((num % higher.value) == 0) {
        let repeatNum = num / higher.value;

        for(let i = 1;i<=repeatNum;i++) {
            roman = roman.concat(higher.literal);
        }
    } else if(num >= (higher.value - LITERAL_TO_VALUE.get(DIFF_PAIR.get(higher.literal)))) {
        roman = DIFF_PAIR.get(higher.literal).concat(higher.literal);
    } else {
        roman = lower.literal; 
        let additiveValue = LITERAL_TO_VALUE.get(DIFF_PAIR.get(higher.literal));
        let additiveLiteral = DIFF_PAIR.get(higher.literal);
        let balance = num - lower.value;

        let repeatNum = balance / additiveValue;
        for(let i = 1; i<=repeatNum; i++) {
            roman = roman.concat(additiveLiteral);
        }
    }

    return roman;
}

function convertToRoman(num) {

    let nString = num.toString();
    let romanString = "";

    let length = nString.length - 1;
    let count = 0;

    for (let numChar of nString) {
        if(numChar === "0") {count++; continue;}
        let placeMultiplier = Math.pow(10, length - count);

        let curNum = parseInt(numChar) * placeMultiplier;
        let tempString = getRoman(curNum);
        romanString = romanString.concat(tempString);
        count++;
    }

    return romanString;
}

console.log(convertToRoman(501))