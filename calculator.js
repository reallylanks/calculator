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
};

const clearMemory = function() {
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    charLimit = undefined;
};

let maxChars = 10
let displayValue1 = '0';
let num1;
let num2;
let operator;
let charLimit;
let integerPart;



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

const characterLimit = function() {

    let resultString = displayValue1;

    if (resultString.length > maxChars) {
        let parts = resultString.split('.');
        integerPart = parts[0];
        let decimalPart = parts[1] || '';

        if (integerPart.length > maxChars) {
            return "Too big!";
        }
       
        let decimalPlacesAllowed = maxChars - integerPart.length - 1;

        if (decimalPlacesAllowed > 0) {
            result = parseFloat(parseFloat(resultString).toFixed(decimalPlacesAllowed));
        } 

        else {
            result = parseFloat(integerPart);
        }

        resultString = result.toString();
    }

    return resultString;
}

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
                
                if (charLimit !== undefined) {
                    charLimit = undefined;
                }

                else if (displayValue1.length >= 10 && charLimit === undefined) {
                    return;
                } 

                if (buttonInfo.text === '.' && displayValue1.includes('.') && (num1 === undefined || num1 === 'ready4Next' )) {
                    console.log('DO NOTHING')
                    return;
                } 

                if (num2 === 'ready4Next' && operator === 'ready4Next') {
                    if (displayValue1 === '0.') {
                        displayValue1 += buttonInfo.text;
                        updateDisplay();
                    }
                   
                    else if (buttonInfo.text === '.'){
                        displayValue1 = '0.';
                        clearMemory();
                        updateDisplay();
                    }

                    else {
                        displayValue1 = buttonInfo.text
                        clearMemory();
                        updateDisplay();
                    } 
                }

                // if num1 is equal to display and operator is NOT undefined, display now equals button text value 
                else if (num1 == displayValue1 && operator !== undefined) {
                    if (buttonInfo.text === '.') {
                        displayValue1 = '0.';
                    }

                    else {
                        displayValue1 = buttonInfo.text;
                    }
                    
                    updateDisplay();
                } 

                // if '.' is pressed and character 1 is 0, add '.'
                else if ((displayValue1.charAt(0) === '0' && buttonInfo.text === '.') || (displayValue1.charAt(0) === '0' && displayValue1.charAt(1) === '.')) {
                    displayValue1 += buttonInfo.text;
                    updateDisplay();
                }
               // if first char is 0, the pressed number replaces it 
                else if (displayValue1.charAt(0) === '0' && displayValue1.charAt(1) !== '.' ) {
                    displayValue1 = buttonInfo.text;
                    updateDisplay();
                }

                else if (num1 == displayValue1 && operator !== undefined) {
                    displayValue1 = buttonInfo.text;
                    updateDisplay();
                } 

                // if calc is fresh or if num2 is 'ready4next', add pressed number to display
                else if ((num1 === undefined && num2 === undefined && operator === undefined) || (num1 !== undefined && (num2 === 'ready4Next' || num2 === undefined))) {
                    displayValue1 += buttonInfo.text;
                    updateDisplay();
                } 
            }
            
            if (buttonInfo.class === 'operator') {
     
                charLimit = 'reset!'

                if (displayValue1 === 'Too big!' || displayValue1 === 'lmao') {
                    return;
                }

                if (num1 === undefined) {
                    num1 = Number(displayValue1);
                }
                
                if (buttonInfo.text === '=' && (operator === 'ready4Next' || operator === undefined)) {
                    return; 
                }

                else if (operator === undefined || operator === 'ready4Next') {
                    operator = buttonInfo.text;
                }

                else if (buttonInfo.text !== '=' && operator !== undefined) {
                    num1 = Number(num1);
                    num2 = Number(displayValue1);

                    if (num2 === 0 && operator === '/') {
                        displayValue1 = 'lmao';
                        num2 = 'ready4Next';
                        operator = 'ready4Next';
                        updateDisplay();
                        return;
                    } 
                    
                    displayValue1 = operate(num1, num2, operator);
                    displayValue1 = characterLimit();
                    num1 = Number(displayValue1);
                    num2 = 'ready4Next';
                    operator = buttonInfo.text;
                    updateDisplay();
                }

                else if (buttonInfo.text === '=' && num1 !== undefined) {
                    num1 = Number(num1);
                    num2 = Number(displayValue1);
                    
                    if (num2 === 0 && operator === '/') {
                        displayValue1 = 'lmao';
                        num2 = 'ready4Next';
                        operator = 'ready4Next';
                        updateDisplay();
                        return;
                    } 

                    displayValue1 = operate(num1, num2, operator);
                    displayValue1 = characterLimit();
                    num1 = Number(displayValue1);
                    num2 = 'ready4Next';
                    operator = 'ready4Next';
                    updateDisplay();
                }
            }

            if (buttonInfo.class === 'special') {

                if (buttonInfo.text === 'AC') {
                    displayValue1 = '0';
                    clearMemory();
                    updateDisplay();
                }

                if (buttonInfo.text === '%') {
                    result = Number(displayValue1) * 0.01;
                    displayValue1 = result.toString();
                    updateDisplay();

                    if (num2 === 'ready4Next' && operator === 'ready4Next') {
                        num1 = displayValue1;
                    }
                }

                if (buttonInfo.text === '+/-') {
                    if (displayValue1.charAt(0) === '-') {
                        displayValue1 = displayValue1.replace('-', '');
                        updateDisplay();
                    }

                    else {
                        displayValue1 = '-' + displayValue1;
                        updateDisplay();
                    }

                    if (num2 === 'ready4Next' && operator === 'ready4Next') {
                        num1 = displayValue1;
                    }
                }
            }
 
            console.log(`num 1 value: ${num1}`);
            console.log(`num 2 value: ${num2}`);
            console.log(`Current operator: ${operator}`);
            console.log(`charLimit value: ${charLimit}`);
        });

        buttonContainer.appendChild(button);
    })
});