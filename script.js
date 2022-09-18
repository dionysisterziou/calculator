const buttons = document.querySelectorAll('button');
const display = document.querySelector('#display');

// Operator functions
const add = (firstNumber, secondNumber) => firstNumber + secondNumber;
const subtract = (firstNumber, secondNumber) => firstNumber - secondNumber;
const multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;
const divide = (firstNumber, secondNumber) => firstNumber / secondNumber;

let firstNumber = null;
let secondNumber = null;
let operator = null;
let defaultedDisplay = true; // The 0 in the default display
let previousValueWasNotNumber = null;
let itHasPeriod = false;

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
            return add;
        case '-':
            return subtract;
        case 'x':
            return multiply;
        case '÷':
            return divide;
    }
}

// Check functions
const checkIfNumber = value => Number(value) >= 0 || Number(value) <= 9;
const checkIfEqual = value => value === '=';
const checkIfAC = value => value === 'AC';
const checkIfOperator = value => value === '+' || value === '-' ||
    value === 'x' || value === '÷';
const checkIfPeriod = value => value === '.';
const checkIfBothValuesExist = (firstNumber, secondNumber) => firstNumber !== null && secondNumber !== null;
const checkIfBackspace = value => value === '';

function checkWhatTheValueIs(value) {
    if (checkIfBackspace(value)) {
        applyIfBackspace();
    } else {
        if (checkIfNumber(value)) {
            applyIfNumber(value);
        } else if (checkIfOperator(value)) {
            applyIfOperator(value);
        } else if (checkIfEqual(value)) {
            applyIfEqual();
        } else if (checkIfAC(value)) {
            applyIfAC();
        } else if (checkIfPeriod(value)) {
            applyIfPeriod();
        }
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
        if (previousValueWasNotNumber && !itHasPeriod) {
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
    itHasPeriod = false;
}

function applyIfEqual() {
    if (checkIfBothValuesExist(firstNumber, secondNumber)) {
        checkIfDividedByZero();

        operator = null;
        previousValueWasNotNumber = true;
        itHasPeriod = false;
    }
}

function applyIfAC() {
    display.textContent = 0;
    operator = null;
    previousValueWasNotNumber = null;
    firstNumber = null;
    secondNumber = null;
    defaultedDisplay = true;
    itHasPeriod = false;
}

function applyIfPeriod() {
    if (!itHasPeriod) {
        if (!previousValueWasNotNumber) {
            display.textContent += '.';
        } else {
            display.textContent = '0.';
        }
        
        itHasPeriod = true;
    }
}

function applyIfBackspace() {
    if (!defaultedDisplay) {
        if (itHasPeriod) {
            itHasPeriod = false;
        }

        if (display.textContent.length === 1) {
            display.textContent = 0;
            defaultedDisplay = true;
        } else {
            display.textContent = display.textContent.slice(0, -1);
        }
    }
}