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
                // if '.' is pressed and character 1 is 0, add '.'
                if (displayValue1.charAt(0) === '0' && buttonInfo.text === '.') {
                    displayValue1 += buttonInfo.text;
                    updateDisplay();
                }
               // if first char is 0, the pressed number replaces it 
                else if (displayValue1.charAt(0) === '0') {
                    displayValue1 = buttonInfo.text;
                    updateDisplay();
                }
                // if num1 is equal to display and operator is NOT undefined, display now equals button text value    
                else if (num1 == displayValue1 && operator !== undefined) {
                    displayValue1 = buttonInfo.text;
                    updateDisplay();
                } 

                // if calc is fresh or if num2 is 'ready4next', add pressed number to display
                else if ((num1 === undefined && num2 === undefined && operator === undefined) || (num1 !== undefined && num2 === 'ready4Next' )) {
                    displayValue1 += buttonInfo.text;
                    updateDisplay();
                } 
                // START OF A NEW EQUATION: if num2 and operator are 'ready4Next', button pressed resets calc and becomes display value
                if (num2 === 'ready4Next' && operator === 'ready4Next') {
                    displayValue1 = buttonInfo.text
                    num1 = undefined;
                    num2 = undefined;
                    operator = undefined;
                    updateDisplay();
                }

               /*  else {
                    displayValue1 += buttonInfo.text;
                    updateDisplay();
                }  */
            }
            
            if (buttonInfo.class === 'operator') {
                
                if (num1 === undefined) {
                    num1 = Number(displayValue1);
                }

                if (operator === undefined || operator === 'ready4Next') {
                    operator = buttonInfo.text;
                }

                else if (buttonInfo.text !== '=' && operator !== undefined) {
                    num2 = Number(displayValue1);
                    displayValue1 = operate(num1, num2, operator);
                    num1 = Number(displayValue1);
                    num2 = 'ready4Next';
                    operator = buttonInfo.text;
                    updateDisplay(); 
                }
                

                else if (buttonInfo.text === '=' && num1 !== undefined) {
                    num2 = Number(displayValue1);
                    displayValue1 = operate(num1, num2, operator);
                    num1 = Number(displayValue1);
                    num2 = 'ready4Next';
                    operator = 'ready4Next';
                    updateDisplay(); 
                }
                
                
                

                // this block
                /* if (num1 !== undefined && operator !== undefined && operator !== 'ready4Next') {
                    num2 = Number(displayValue1);
                    operator = buttonInfo.text;
                    displayValue1 = operate(num1, num2, operator);
                    num1 = Number(displayValue1);
                    num2 = 'ready4Next';
                    operator = 'ready4Next';
                    updateDisplay();
                }  */
                
        
            }

            if (buttonInfo.class === 'special') {
                if (buttonInfo.text === 'AC') {
                    displayValue1 = '0';
                    num1 = undefined;
                    num2 = undefined;
                    operator = undefined;
                    updateDisplay();
                }

                if (buttonInfo.text === '%') {
                    result = Number(displayValue1) * 0.01;
                    displayValue1 = result.toString();
                    updateDisplay();
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
                }
            }


            /*so
            NOTES FOR NEXT SESSIONN 1 
            CURRENTLY CAN DO 1+1=2, + 2 = 4
            NEED EVERYTHING TO RESET IF A NUMBER IS PRESSED AFTER '='
            currently just adds numbers to display lol

                Maybe need to let operator and num2 equal to something other 
                than undefined so it's easy to detect when doing a second equation
                 !! ready4Next !!

            ALSO NEED A WAY TO ADD NUMBERS TO ZERO WHEN DECIMAL IS PRESSED
            CURRENTLY OUTPUTS JUST '.4' INSTEAD OF '0.4'


            ---------------------------------------------------------------------
            NOTES FOR SESSION 2 
            Can finally do subsequent equations (hooray!)

            I broke something else lol
            num1 + num 2 = 
            then + num 2 
            breaks the calculator (happens when i click num2, 
            so must be a number button rule)...sets num2 same as num1???
            if '=' is clicked, operator needs to be reset every time

            NEED TO LIMIT INPUT TO ONLY ONW '.'
            NEED TO LIMIT AMOUNT OF CHARACTERS TO 10
                Round bigger answers?
                disable buttons!

            } */
            
            console.log(`num 1 value: ${num1}`);
            console.log(`num 2 value: ${num2}`);
            console.log(`Current operator: ${operator}`);
            
            
        });

        // add function for buttons to be lighter on hover, also add white on click
        buttonContainer.appendChild(button);
    })
});