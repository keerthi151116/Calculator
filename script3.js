const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

let currentInput = '';

function updateDisplay(value) {
    display.textContent = value;
}

function calculate(expression) {
    try {
        // Replace square root and exponentiation with JavaScript-compatible syntax
        expression = expression.replace(/sqrt/g, 'Math.sqrt');
        expression = expression.replace(/\^/g, '**');

        // Evaluate the expression
        const result = eval(expression);

        // Handle special cases
        if (result === Infinity || isNaN(result)) {
            return 'Error';
        }

        return result;
    } catch (error) {
        return 'Error';
    }
}

function handleButtonClick(event) {
    const value = event.target.dataset.value;

    if (value === 'C') {
        currentInput = '';
        updateDisplay('0');
    } else if (value === '=') {
        if (currentInput) {
            const result = calculate(currentInput);
            updateDisplay(result);
            currentInput = result; // Update currentInput to show result for further calculations
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        // Ensure there are no consecutive operators and handle first input
        if (currentInput && !['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
            currentInput += ` ${value} `;
            updateDisplay(currentInput);
        }
    } else if (value === 'sqrt') {
        currentInput += 'sqrt(';
        updateDisplay(currentInput);
    } else if (value === '^') {
        currentInput += '**';
        updateDisplay(currentInput);
    } else if (value === '(') {
        currentInput += '(';
        updateDisplay(currentInput);
    } else if (value === ')') {
        currentInput += ')';
        updateDisplay(currentInput);
    } else {
        // Append value to the current input
        currentInput += value;
        updateDisplay(currentInput);
    }
}

// Set up event listeners for all buttons
buttons.forEach(button => button.addEventListener('click', handleButtonClick));
