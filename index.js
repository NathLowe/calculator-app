// Functions
var setTheme = function (theme) {
    var body = document.querySelector('body');
    if (body) {
        if (body.classList.contains('theme1'))
            body.classList.remove('theme1');
        if (body.classList.contains('theme2'))
            body.classList.remove('theme2');
        if (body.classList.contains('theme3'))
            body.classList.remove('theme3');
        body.classList.add(theme);
    }
};
var addFunc = function (kept, actual) { return kept + actual; };
var substractFunc = function (kept, actual) { return kept - actual; };
var multiplyFunc = function (kept, actual) { return kept * actual; };
var divideFunc = function (kept, actual) { return kept / actual; };
var themeToggler = document.querySelector('#theme-toggler #clicker');
if (themeToggler) {
    themeToggler.addEventListener('click', function (e) {
        var target = e.target;
        if (target) {
            if (target.classList.contains('theme-1'))
                setTheme('theme1');
            if (target.classList.contains('theme-2'))
                setTheme('theme2');
            if (target.classList.contains('theme-3'))
                setTheme('theme3');
        }
    });
}
// Calculator
var keys = document.querySelectorAll('#keys .key');
var result = document.querySelector('#result');
var keptValue = 0;
var startOver = false;
var toDecimal = false;
var isDecimal = false;
var operationFunc = addFunc;
var reset = function () {
    keptValue = 0;
    toDecimal = false;
    isDecimal = false;
    operationFunc = addFunc;
    startOver = true;
};
keys.forEach(function (key) {
    key.addEventListener('click', function (e) {
        if (result) {
            var resultText = result.innerHTML;
            var resultFloat = parseFloat(resultText.split(',').join(''));
            if (this.classList.contains('delete')) {
                if (toDecimal)
                    toDecimal = false; // if i had press on the dot
                if (resultText.length > 1) { //if more than one number on the screen
                    var newValue = parseFloat(resultText.slice(0, -1).split(',').join('')); //remove the last value
                    var newValueText = newValue.toString();
                    if (resultText.includes('.') && !newValueText.includes('.'))
                        isDecimal = false; //if no longer decimal
                    resultFloat = newValue;
                }
                else
                    resultFloat = 0;
            }
            else if (this.classList.contains('reset')) {
                reset();
                resultFloat = 0;
            }
            else if (this.classList.contains('sign')) {
                var sign = this.innerHTML.toLowerCase();
                if (sign !== '.') {
                    if (keptValue !== 0) {
                        resultFloat = operationFunc(keptValue, resultFloat);
                    }
                    keptValue = resultFloat;
                    startOver = true;
                }
                switch (sign) {
                    case '+':
                        operationFunc = addFunc;
                        break;
                    case '-':
                        operationFunc = substractFunc;
                        break;
                    case 'x':
                        operationFunc = multiplyFunc;
                        break;
                    case '/':
                        operationFunc = divideFunc;
                        break;
                    case '.':
                        if (!isDecimal)
                            toDecimal = true;
                        break;
                    default:
                        break;
                }
            }
            else if (this.classList.contains('equal')) {
                resultFloat = operationFunc(keptValue, resultFloat);
                reset();
            }
            else {
                var number = parseInt(this.innerHTML.toLowerCase());
                if (toDecimal) {
                    toDecimal = false;
                    resultFloat = parseFloat(resultFloat.toString() + '.' + number.toString());
                    if (number !== 0)
                        isDecimal = true;
                }
                else {
                    resultFloat = parseFloat(resultFloat.toString() + number.toString());
                }
                if (startOver) {
                    startOver = false;
                    resultFloat = number;
                }
            }
            result.innerHTML = new Intl.NumberFormat().format(resultFloat);
        }
    });
});
// Keyboard press
window.addEventListener('keydown', function (e) {
    var key = e.key.toLowerCase();
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '/', '-'].includes(key)) {
        keys.forEach(function (k) {
            if (k.innerHTML.toLowerCase() === key)
                k.click();
        });
    }
    else if (key === 'enter') {
        keys.forEach(function (k) {
            if (k.innerHTML.toLowerCase() === '=')
                k.click();
        });
    }
    else if (['backspace', 'del'].includes(key)) {
        keys.forEach(function (k) {
            if (k.innerHTML.toLowerCase() === 'del')
                k.click();
        });
    }
    else if (key === '*') {
        keys.forEach(function (k) {
            if (k.innerHTML.toLowerCase() === 'x')
                k.click();
        });
    }
});
