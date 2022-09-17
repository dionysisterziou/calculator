const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

// Operators' functions
const add = (firstNumber, secondNumber) => firstNumber + secondNumber;
const subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
const multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
const divide = (firstNumber, secondNumber) => firstNumber / secondNumber;

let firstNumber = null;
let secondNumber = null;
let operator = null;
let defaultedDisplay = true; // The 0 in the default display
let previousValueWasNotNumber = null;

buttons.forEach(button => {
    button.addEventListener('click', displayValue);
});

// Other functions
function displayValue(button) {
    let value = button.target.textContent;
    secondNumber = Number(display.textContent);

    checkWhatTheValueIs(value)
    checkTheDisplayedLength(); // Keeps it 9 digits
}

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

function transformOperatorToFunction(value) {
    switch (value) {
        case '+':
            value = add;
            return value;
        case '-':
            value = subtract;
            return value;
        case 'x':
            value = multiply;
            return value;
        case '÷':
            value = divide;
            return value;
    }
}

// Check functions
const checkIfNumber = value => Number(value) >= 0 || Number(value) <= 9;
const checkIfEqual = value => value === '=';
const checkIfAC = value => value === 'AC';
const checkIfOperator = value => value === '+' || value === '-' ||
    value === 'x' || value === '÷';

function checkWhatTheValueIs(value) {
    if (checkIfNumber(value)) {
        applyIfNumber(value);
    } else if (checkIfOperator(value)) {
        applyIfOperator(value);
    } else if (checkIfEqual(value)) {
        applyIfEqual();
    } else if (checkIfAC(value)) {
        applyIfAC();
    }
}

function checkIfDividedByZero() {
    if (!isFinite(operate(operator, firstNumber, secondNumber))) {
        display.textContent = NaN;
    } else {
        display.textContent = operate(operator, firstNumber, secondNumber)
    }
}

function checkTheDisplayedLength() {
    if (display.textContent.length > 9) {
        display.textContent = display.textContent.substring(0, 9);
    }
}

// Apply functions
function applyIfNumber(value) {
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
}

function applyIfOperator(value) {
    if (operator !== null && !previousValueWasNotNumber) {
        checkIfDividedByZero();

        operator = transformOperatorToFunction(value);
    } else {
        operator = transformOperatorToFunction(value);
    }

    firstNumber = Number(display.textContent);
    previousValueWasNotNumber = true;
}

function applyIfEqual() {
    checkIfDividedByZero();

    operator = null;
    previousValueWasNotNumber = true;
}

function applyIfAC() {
    display.textContent = 0;
    operator = null;
    previousValueWasNotNumber = null;
    firstNumber = null;
    secondNumber = null;
    defaultedDisplay = true;
}