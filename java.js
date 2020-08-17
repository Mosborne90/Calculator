let value = '';
let valueArray = [];

let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');

// Operate Function
operate = (array) => {
    array = valueArray;
    let result = 0;
    
    for (i = 0; i < array.length; i++) {
        if (array[i] == '+') {
            result += (array[i-1] + array[i+1]);
        } else if (array[i] == '/') {
            result += (array[i-1] / array[i+1]);
        } else if (array[i] == '*') {
            result += (array[i-1] * array[i+1]);
        } else if (array[i] == '-') {
            result += (array[i-1] - array[i+1]);
        } else if (array[i] == '%') {
            result += (array[i-1] / 100);
        }
    };
    return (result % 1 != 0) ? result.toFixed(2) : result;
};

// Event listener for number buttons
buttons.forEach(button => {
    let numbers = /[0-9.]/;

    if (button.textContent.match(numbers)) {
        button.addEventListener('click', () => {

            if (display.textContent.length > 17) {
                errorMessage();
                valueArray = [];
            } else {
                value += button.className;
                display.textContent = value;
            };
        });
    };
});

// Event listener for Operator buttons
buttons.forEach(button => {
    if (button.id.match('operator')) {
        button.addEventListener('click', () => {
            valueArray.push(Number(value));
            valueArray.push(button.className);
            reset(); 
        });
    };
});

// Event listener for equals button
document.querySelector('.equal').addEventListener('click', () => {
    valueArray.push(Number(value));
    value = operate();
    display.textContent = value;
    valueArray.push(Number(value)); // Allows for additional inputs using current value
});

// Event listener for clear button
document.querySelector('.clear').addEventListener('click', () => {
    reset();
    valueArray = [];
});

// Reset Value & Display Error
errorMessage = () => {value = '', display.textContent = 'Error'};

// Reset Value & Display
reset = () => {value = '', display.textContent = ''};
