const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

// Operators' functions
let add = (firstNumber, secondNumber) => firstNumber + secondNumber;
let subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
let multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
let divide = (firstNumber, secondNumber) => firstNumber / secondNumber;

let firstNumber = null;
let operator = null;
let defaultedDisplay = true;
let previousValueWasNotNumber = false;

function checkIfNumber(value) {
    if (Number(value) >= 0 || Number(value) <= 9) {
        return true;
    }
}

function checkIfOperator(value) {
    if (value === '+' || value === '-' || value === 'x' || value === '÷') {
        return true;
    }
}

function checkIfEqual(value) {
    if (value === '=') {
        return true;
    }
}

function transformOperatorToFunction(value) {
    if (value === '+') {
        value = add;
    } else if (value === '-') {
        value = subtract;
    } else if (value === 'x') {
        value = multiply;
    } else if (value === '÷') {
        value = divide;
    }

    return value;
}

function displayValue(button) {
    let value = button.target.textContent;

    if (checkIfNumber(value)) {
        if (defaultedDisplay) {
            display.textContent = value;
            defaultedDisplay = false;
        } else {
            if (previousValueWasNotNumber) {
                display.textContent = value;
                previousValueWasNotNumber = false;
            } else {
                display.textContent += value;
            }
        }
    } else if (checkIfOperator(value)) {
        firstNumber = Number(display.textContent);
        operator = transformOperatorToFunction(value);
        previousValueWasNotNumber = true;
    } else if (checkIfEqual(value)) {
        secondNumber = Number(display.textContent);
        display.textContent = operate(operator, firstNumber, secondNumber);
        previousValueWasNotNumber = true;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', displayValue);
});

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}