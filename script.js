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
let defaultedDisplay = true; // The 0 in the default display
let previousValueWasNotNumber = null;

buttons.forEach(button => {
    button.addEventListener('click', displayValue);
});

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
        if (operator !== null && !previousValueWasNotNumber) {
            if (checkIfDividedByZero(operator, secondNumber)) {
                display.textContent = NaN;
            } else {
                display.textContent = operate(operator, firstNumber, secondNumber);
            }

            operator = transformOperatorToFunction(value);
        } else {
            operator = transformOperatorToFunction(value);
        }

        firstNumber = Number(display.textContent);
        previousValueWasNotNumber = true;
    } else if (checkIfEqual(value)) {
        if (checkIfDividedByZero(operator, secondNumber)) {
            display.textContent = NaN;
        } else {
            display.textContent = operate(operator, firstNumber, secondNumber);
        }

        operator = null;
        previousValueWasNotNumber = true;
    } else if (checkIfAC(value)) {
        display.textContent = 0;
        operator = null;
        previousValueWasNotNumber = null;
        firstNumber = null;
        secondNumber = null;
        defaultedDisplay = true;
    }

    // It keeps the length of the displayed value at 9 digits
    if (display.textContent.length > 9) {
        display.textContent = display.textContent.substring(0, 9);
    }

}

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

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

function checkIfAC(value) {
    if (value === 'AC') {
        return true;
    }
}

function checkIfDividedByZero(operator, secondNumber) {
    if (operator === divide && secondNumber === 0) {
        return true;
    }
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