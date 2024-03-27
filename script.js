let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.querySelector('.display');

function updateDisplay() {
  display.textContent = displayValue;
}

updateDisplay();

document.querySelectorAll('.number').forEach((button) => {
  button.addEventListener('click', function() {
    if (waitingForSecondOperand === true) {
      displayValue = button.textContent;
      waitingForSecondOperand = false;
    } else {
      displayValue =
        displayValue === '0' ? button.textContent : displayValue + button.textContent;
    }
    updateDisplay();
  });
});

document.querySelector('.decimal').addEventListener('click', function() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
});

document.querySelector('.clear').addEventListener('click', function() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
});

document.querySelectorAll('.operator').forEach((button) => {
  button.addEventListener('click', function() {
    const currentValue = parseFloat(displayValue);
    if (operator && waitingForSecondOperand) {
      operator = button.textContent;
      return;
    }
    if (firstOperand === null) {
      firstOperand = currentValue;
    } else if (operator) {
      const result = operate(operator, firstOperand, currentValue);
      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstOperand = parseFloat(displayValue);
    }
    operator = button.textContent;
    waitingForSecondOperand = true;
    updateDisplay();
  });
});

document.querySelector('.equals').addEventListener('click', function() {
  const currentValue = parseFloat(displayValue);
  if (operator && !waitingForSecondOperand) {
    displayValue = operate(operator, firstOperand, currentValue);
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
  }
});

document.querySelector('.backspace').addEventListener('click', function() {
  displayValue = displayValue.slice(0, -1);
  if (displayValue === '') {
    displayValue = '0';
  }
  updateDisplay();
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '÷':
      return divide(a, b);
    default:
      return null;
  }
}
