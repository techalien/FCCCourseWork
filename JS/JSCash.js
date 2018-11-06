// Problem: https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register/

const CURRENCY_MULTIPLIER = [
    {type:"PENNY", value: 0.01},
    {type:"NICKEL", value: 0.05},
    {type:"DIME", value: 0.1},
    {type:"QUARTER", value: 0.25},
    {type:"ONE", value:  1},
    {type:"FIVE",value: 5},
    {type:"TEN", value: 10},
    {type:"TWENTY", value: 20},
    {type:"ONE HUNDRED", value: 100}
].reverse();

const INSUFFICIENT_FUNDS = {
    status: "INSUFFICIENT_FUNDS",
    change: []
};

function checkCashRegister(price, cash, cid) {

  let totalAvailableChangeInDollars = cid.map((currency) => currency[1]).reduce((acc, currency) => acc + currency);
  let changeToGive = cash - price;  
  
  if(changeToGive > totalAvailableChangeInDollars) {
    return INSUFFICIENT_FUNDS;
  }

  let status = changeToGive < totalAvailableChangeInDollars ? "OPEN" : "CLOSED";
  let change = [];
  for (let cType of CURRENCY_MULTIPLIER) {
    if(cType.value <= changeToGive) {
        let availableDenomination = cid.filter((currency) => currency[0] === cType.type)[0];
        let requiredUnits = parseInt((changeToGive / cType.value));
        let availableUnits = parseInt(availableDenomination[1] / cType.value);
        let usedUnits = Math.min(requiredUnits, availableUnits);
        
        change.push([cType.type, usedUnits * cType.value]);
        let amountUsed = usedUnits * cType.value;
        changeToGive = parseFloat((changeToGive.toFixed(2) - amountUsed).toFixed(2));
    }
  }



  if((changeToGive + 0.00001) > 0.01) {
      return INSUFFICIENT_FUNDS;
  } 

  let changeObj = {
      status: status,
      change: status === "CLOSED" ? cid : change
  };
  // Here is your change, ma'am.
  //console.log(change.toString())
  return changeObj;
}


