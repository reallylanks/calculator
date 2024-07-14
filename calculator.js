const add = function(num1, num2) {
    return (num1 + num2)
};

const subtract = function(num1, num2) {
	return (num1 - num2)
};

const multiply = function(num1, num2) {
    return (num1 * num2)
};

const divide = function(num1, num2) {
    return (num1 / num2)
};

console.log(divide(100, 2));

let num1;
let num2;
let operator; 

const operate = function(num1, num2, operator) {
    if (operator === add) {
        return add(num1, num2);
    } else if (operator === subtract) {
        return subtract(num1, num2);
    } else if (operator === multiply) {
        return multiply(num1, num2);
    } else {
        return divide(num1, num2);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');
    const buttons = [
        {text: 'AC', class: 'special'},
        {text: '+/-', class: 'special'},
        {text: '%', class: 'special'},
        {text: '/', class: 'operator'},
        {text: '7', class: 'number'},
        {text: '8', class: 'number'},
        {text: '9', class: 'number'},
        {text: '*', class: 'operator'},
        {text: '4', class: 'number'},
        {text: '5', class: 'number'},
        {text: '6', class: 'number'},
        {text: '-', class: 'operator'},
        {text: '1', class: 'number'},
        {text: '2', class: 'number'},
        {text: '3', class: 'number'},
        {text: '+', class: 'operator'},
        {text: '0', class: 'wide number'},
        {text: '.', class: 'number'},
        {text: '=', class: 'operator'}
    ];
    

    buttons.forEach(buttonInfo => {
        const button = document.createElement('button');
        button.innerText = buttonInfo.text;
        button.classList.add(buttonInfo.class);
        button.addEventListener('click', () => {
            /* this doesn't do anything, need to find 
            a way to return to the display */
            return button.innerText;
        });
        buttonContainer.appendChild(button);
    })
});