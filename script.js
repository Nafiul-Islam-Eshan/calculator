
'use strict'

const screen = document.querySelector("#result");

let currentInput = '';
let previousValue = null;
let operator = null;
let shouldReset = false;

function updateDisplay() {
    screen.value = currentInput;
}

function appendNumber(num) {
    if (shouldReset) {
        currentInput = '';
        shouldReset = false;
    }
    if (num === '.' && currentInput.includes('.')) {
        return; // Prevent multiple decimals
    }
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput !== '' && previousValue !== null && operator) {
        calculate();
    }
    if (currentInput !== '') {
        previousValue = parseFloat(currentInput);
    }
    operator = op;
    shouldReset = true;
}

function clearAll() {
    currentInput = '';
    previousValue = null;
    operator = null;
    shouldReset = false;
    screen.value = '';
}

function backspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function calculate() {
    if (previousValue !== null && operator && currentInput !== '') {
        let result;
        const current = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = previousValue + current;
                break;
            case '-':
                result = previousValue - current;
                break;
            case '*':
                result = previousValue * current;
                break;
            case '/':
                if (current === 0) {
                    result = 'ERROR';
                } else {
                    result = previousValue / current;
                }
                break;
            default:
                result = 'ERROR';
        }
        screen.value = result;
        previousValue = typeof result === 'number' ? result : null;
        currentInput = '';
        operator = null;
        shouldReset = true;
    }
}

// Theme toggle
const themeSwitch = document.querySelector('.theme-switch');
const calcBox = document.querySelector('.calc-box');

themeSwitch.addEventListener('click', () => {
    themeSwitch.classList.toggle('active');
    calcBox.classList.toggle('dark-theme');
});
document.getElementById('back').addEventListener('click', backspace);
document.getElementById('equal').addEventListener('click', calculate);

// Number buttons
for (let i = 0; i <= 9; i++) {
    document.getElementById(i.toString()).addEventListener('click', () => appendNumber(i.toString()));
}

// Operator buttons
const operators = ['+', '-', '*', '/', '(', ')', '.'];
operators.forEach(op => {
    document.getElementById(op).addEventListener('click', () => {
        if (op === '.') {
            appendNumber('.');
        } else {
            appendOperator(op);
        }
    });
});