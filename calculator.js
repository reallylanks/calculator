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

console.log(add(100, 2));

let num1;
let num2;
let operator; 

const operate = function(num1, num2, operator) {
    if (operator === add) {
        return add(num1, num2);
    } else if (operator === subtract) {
        return subtract(num1, num2);
    } else if (operator === multiply) {
        return multiply(num1, num2)
    } else {
        return divide(num1, num2);
    }
};