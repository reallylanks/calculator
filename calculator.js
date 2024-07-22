const add = function(num1, num2) {
    return (num1 + num2);
};

const subtract = function(num1, num2) {
	return (num1 - num2);
};

const multiply = function(num1, num2) {
    return (num1 * num2);
};

const divide = function(num1, num2) {
    return (num1 / num2);
};

const updateDisplay = function() {
    document.getElementById('display').innerText = `${displayValue1}`;
}

let displayValue1 = '0';
let num1;
let num2;
let operator; 

const operate = function(num1, num2, operator) {
    let result;
    if (operator === '+') {
        result = add(num1, num2);
    } else if (operator === '-') {
        result = subtract(num1, num2);
    } else if (operator === '*') {
        result = multiply(num1, num2);
    } else if (operator === '/') {
        result = divide(num1, num2);
    }

    return result.toString();

};

document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.getElementById('buttonContainer');
    const display = document.getElementById('display');

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
        {text: '0', class: 'wide-number'},
        {text: '.', class: 'number'},
        {text: '=', class: 'operator'}
    ];
    
    buttons.forEach(buttonInfo => {
        const button = document.createElement('button');
        button.innerText = buttonInfo.text;
        button.classList.add(buttonInfo.class);
        button.addEventListener('click', () => {
            
            if (buttonInfo.class === 'number' || buttonInfo.class === 'wide-number') {

                if (displayValue1.charAt(0) === '0') {
                    displayValue1 = buttonInfo.text;
                    updateDisplay();
                }

                else if (num1 == displayValue1 && operator !== undefined) {
                    displayValue1 = buttonInfo.text;
                    updateDisplay();
                }

                else {
                    displayValue1 += buttonInfo.text;
                    updateDisplay();
                } 
            }
            
            if (buttonInfo.class === 'operator') {
                
                if (operator === undefined) {
                    operator = buttonInfo.text;
                }
                
                
                if (num1 === undefined) {
                    num1 = Number(displayValue1);
                }

                if (buttonInfo.text === '=' && num1 !== undefined) {
                    num2 = Number(displayValue1);
                    displayValue1 = operate(num1, num2, operator);
                    num1 = Number(displayValue1);
                    num2 = undefined;
                    operator = undefined;
                    updateDisplay();
                }
                
            }

            if (buttonInfo.class === 'special') {
                if (buttonInfo.text === 'AC') {
                    displayValue1 = '0';
                    num1 = undefined;
                    num2 = undefined;
                    updateDisplay();
                }
            }


            /*so
            NOTES FOR NEXT SESSIONN
            CURRENTLY CAN DO 1+1=2, + 2 = 4
            NEED EVERYTHING TO RESET IF A NUMBER IS PRESSED AFTER '='
            currently just adds numbers to display lol

            ALSO NEED A WAY TO ADD NUMBERS TO ZERO WHEN DECIMAL IS PRESSED
            CURRENTLY OUTPUTS JUST '.4' INSTEAD OF '0.4'
            } */
            
            console.log(`num 1 value: ${num1}`);
            console.log(`num 2 value: ${num2}`);
            console.log(`Current operator: ${operator}`);
            
            
        });

        // add function for buttons to be lighter on hover, also add white on click
        buttonContainer.appendChild(button);
    })
});