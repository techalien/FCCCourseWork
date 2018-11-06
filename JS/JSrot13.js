// Problem: https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher/

const A_CODE = 65, Z_CODE = 90, CIPHER = 13;

function rot13(str) {
    let newStr = "";

    for (let char of str) {
        if(char.match(/^[A-Z]+$/)) {
            let charCode = char.charCodeAt(0);
            //console.log(charCode)

            let newChar;
            if(charCode + CIPHER > Z_CODE) {
                let rotateDiff = (CIPHER - (Z_CODE - charCode));

                newChar = String.fromCharCode(A_CODE + rotateDiff - 1);
            } else {
                newChar = String.fromCharCode(charCode + CIPHER);
            }

            newStr = newStr.concat(newChar);
        } else {
            newStr = newStr.concat(char);
        }
    }
    
    //console.log(newStr);
    return newStr;
}

rot13("SERR PBQR PNZC");