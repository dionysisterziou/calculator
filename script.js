const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

// Operators' functions
let add = (firstNumber, secondNumber) => firstNumber + secondNumber;
let subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
let multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
let divide = (firstNumber, secondNumber) => firstNumber / secondNumber;

let firstNumber = null;
let secondNumber = null;
let operator = null;
let defaultedDisplay = true; // The 0 in the calculator's display
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
    secondNumber = Number(display.textContent);

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
        if (operator !== null) {
            display.textContent = operate(operator, firstNumber, secondNumber);
        } else {
            operator = transformOperatorToFunction(value);
        }

        firstNumber = Number(display.textContent);
        previousValueWasNotNumber = true;
    } else if (checkIfEqual(value)) {
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