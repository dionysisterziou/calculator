const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

// Operators
let add = (firstNumber, secondNumber) => firstNumber + secondNumber;
let subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
let multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
let divide = (firstNumber, secondNumber) => firstNumber / secondNumber;

function checkIfZero(number) {
    if (number === 0) {
        return true;
    }
}

function displayValue(button) {
    let value = button.target.textContent;
    let number = null;

    if (checkIfZero(Number(display.textContent))) {
        display.textContent = value;
        number = value;
    } else {
        display.textContent += value;
        number += value;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', displayValue);
});

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}