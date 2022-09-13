const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

// Operators
let add = (firstNumber, secondNumber) => firstNumber + secondNumber;
let subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
let multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
let divide = (firstNumber, secondNumber) => firstNumber / secondNumber;

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        let number = e.target.textContent;

        if (checkIfZero(Number(display.textContent))) {
            display.textContent = number;
        } else {
            display.textContent += number;
        }
    })
})

function checkIfZero(number) {
    if (number === 0) {
        return true;
    }
}