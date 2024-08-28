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
};

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
    
            // NOTE. anything (operator) number then decimal, erases number
        
            if (buttonInfo.class === 'number' || buttonInfo.class === 'wide-number') {
                
                if (buttonInfo.text === '.' && displayValue1.includes('.') && (num1 === undefined || num1 === 'ready4Next' )) {
                
                    console.log('DO NOTHING')
                    return;
                } 

                if (num2 === 'ready4Next' && operator === 'ready4Next') {
                    if (displayValue1 === '0.') {
                        displayValue1 += buttonInfo.text;
                        updateDisplay();
                        console.log("Option 1 was run");
                    }
                   
                    else if (buttonInfo.text === '.'){
                        displayValue1 = '0.';
                        clearMemory();
                        updateDisplay();
                        console.log("Option 2 was run");
                    }

                    else {
                        displayValue1 = buttonInfo.text
                        clearMemory();
                        updateDisplay();
                        console.log("Option 3 was run");
                    }
                    
                }

                else if (buttonInfo.text === '.' && operator !== undefined) {

                    console.log(`Display Value : ${displayValue1}`)

                     displayValue1 = '0.';
                     console.log('did it work..?')
                     updateDisplay();       

                    /*if (displayValue1 === num1) {
                        displayValue1 = '0.';
                        updateDisplay();
                    }

                    else {
                        displayValue1 += buttonInfo.text;
                        console.log('problem!')
                        updateDisplay();
                    } */

                    
                    
                    // this is the root of my decimal problem...to tired to even put it into words...
                    
                }

                // if num1 is equal to display and operator is NOT undefined, display now equals button text value 
                else if (num1 == displayValue1 && operator !== undefined) {
                    displayValue1 = buttonInfo.text;
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

                // if calc is fresh or if num2 is 'ready4next', add pressed number to display
                else if ((num1 === undefined && num2 === undefined && operator === undefined) || (num1 !== undefined && (num2 === 'ready4Next' || num2 === undefined))) {
                    displayValue1 += buttonInfo.text;
                    updateDisplay();
                } 
                // START OF A NEW EQUATION: if num2 and operator are 'ready4Next', button pressed resets calc and becomes display value
                /* if (num2 === 'ready4Next' && operator === 'ready4Next') {
                    if (displayValue1 === '0.') {
                        displayValue1 += buttonInfo.text;
                        updateDisplay();
                    }
                   
                    if (buttonInfo.text === '.'){
                        displayValue1 = '0.';
                        updateDisplay();
                    }

                    else {
                        displayValue1 = buttonInfo.text
                        num1 = undefined;
                        num2 = undefined;
                        operator = undefined;
                        updateDisplay();
                    }
                    
                } */

               
            }
            
            if (buttonInfo.class === 'operator') {
                
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
                    displayValue1 = operate(num1, num2, operator);
                    num1 = Number(displayValue1);
                    num2 = 'ready4Next';
                    operator = buttonInfo.text;
                    updateDisplay(); 
                }

                else if (buttonInfo.text === '=' && num1 !== undefined) {
                    num1 = Number(num1);
                    num2 = Number(displayValue1);
                    displayValue1 = operate(num1, num2, operator);
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


            /*so
            NOTES FOR NEXT SESSIONN 1 
            when num2 and operator = 'ready4next', pressing '.'
            and then a number, deletes the '0.'

            also, 0.5 * 3 returns crazy results???
                I think this can be fixed with rounding

            } */
            
            console.log(`num 1 value: ${num1}`);
            console.log(`num 2 value: ${num2}`);
            console.log(`Current operator: ${operator}`);
            console.log(`Contains decimal? ${containsChar}`);
            
            
        });

        // add function for buttons to be lighter on hover, also add white on click
        buttonContainer.appendChild(button);
    })
});