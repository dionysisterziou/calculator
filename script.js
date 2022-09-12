let add = (firstNumber, secondNumber) => firstNumber + secondNumber;
let subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
let multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
let divide = (firstNumber, secondNumber) => firstNumber / secondNumber;

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

console.log(operate(add, 4, 2));
console.log(operate(subtract, 4, 2));
console.log(operate(multiply, 4, 2));
console.log(operate(divide, 4, 2));