//Problem: https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator

function checkCharacterValidity(str) {
    for (let index in str) {
        if(!index.match((/^[0-9() -]+$/))) {
            return false;
        }
    }

    return true;
}

function getNumericCharCount(str) {
    let count = 0;
    for (let index of str) {
        if(index.match((/^[0-9]+$/))) {
            count++;
        }
    }

    return count;
}

function getHypenCount(str) {
    let count = 0;
    for (let index of str) {
        if(index === "-") {
            count++;
        }
    }

    return count;
}

function telephoneCheck(str) {

    if(!checkCharacterValidity(str)) {
        return false;
    }

    let numericCount = getNumericCharCount(str);

    if(numericCount < 10 || numericCount > 11) return false;

    if(numericCount === 10) {
        if(str.length === 10) {
            return true;
        }

        let index = 0;
        for (let value of str) {
            if(value === "(" && index !== 0) return false;
            if(value === "(" && index === 0) {
                if(str.charAt(4) !== ")") return false;
            }

            if(value === ")" && index !== 4) return false;
            index++;
        }

        let hyphenCount = getHypenCount(str)
        if(hyphenCount !== 0) {
            if(hyphenCount > 2) return false;
            if(hyphenCount >= 1 && str.charAt(str.length - 5) !== "-") return false;
            if(hyphenCount ==2 && str.charAt(str.length - 9) !== "-") return false;
        }

        return true;
    } else {
        if(str.charAt(0) !== "1") return false;
        if(str.charAt(1) !== " " && str.charAt(1) !== "(") return false;
        else {
            if(str.charAt(1) === " ") {
                return telephoneCheck(str.substring(2));
            } else {
                return telephoneCheck(str.substring(1));
            }
        }
    }
}

console.log(telephoneCheck("1 (555) 555-5555"))
//console.log(checkCharacterValidity("555"))