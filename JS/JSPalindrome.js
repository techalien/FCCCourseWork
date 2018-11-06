//Problem: https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/palindrome-checker/

function palindrome(str) {
  // Good luck!

  let string = str.toLowerCase();
  let charArray = []

  for (let char of string) {
    if(char.match((/^[0-9a-z]+$/))) {
      charArray.push(char);
    }
  }

  let len = charArray.length;
  let halfLen = parseInt(len / 2);

  for(let i = 0; i < halfLen; i++) {
    if(charArray[i] !== charArray[len -1 - i]) {
      return false;
    }
  }

  return true;
}



palindrome("eye");