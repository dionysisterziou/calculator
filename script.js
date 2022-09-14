const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

// Operators' functions
let add = (firstNumber, secondNumber) => firstNumber + secondNumber;
let subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
let multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
let divide = (firstNumber, secondNumber) => firstNumber / secondNumber;

let firstNumber = null;
let operator = null;

function checkIfZero(value) {
    if (value === 0) {
        return true;
    }
}

function checkIfOperator(value) {
    if (value === '+' || value === '-' || value === 'x' || value === '÷') {
        return true;
    } else {
        return false;
    }
}

function displayValue(button) {
    let value = button.target.textContent;

    if (value === '=') {
        if (operator === '+') {
            firstNumber = operate(add, firstNumber, Number(display.textContent))
            operator = null;
            display.textContent = firstNumber;
        } else if (operator === '-') {
            firstNumber = operate(subtract, firstNumber, Number(display.textContent));
            operator = null;
            display.textContent = firstNumber;
        } else if (operator === 'x') {
            firstNumber = operate(multiply, firstNumber, Number(display.textContent));
            operator = null;
            display.textContent = firstNumber;
        } else if (operator === '÷') {
            firstNumber = operate(divide, firstNumber, Number(display.textContent));
            operator = null;
            display.textContent = firstNumber;
        }
    } else {
        if (checkIfOperator(value) === false) {
            if (checkIfZero(Number(display.textContent))) {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        } else {
            if (operator === null) {
                operator = value;
            }

            if (firstNumber === null) {
                firstNumber = Number(display.textContent);
            }
            
            display.textContent = '0';
        }
    }
}

buttons.forEach(button => {
    button.addEventListener('click', displayValue);
});

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}