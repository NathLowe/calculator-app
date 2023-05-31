// Functions
const setTheme = (theme) => {
    let body = document.querySelector('body')
    if(body){
        if(body.classList.contains('theme1')) body.classList.remove('theme1')
        if(body.classList.contains('theme2')) body.classList.remove('theme2')
        if(body.classList.contains('theme3')) body.classList.remove('theme3')
        body.classList.add(theme)
    }
}

const addFunc = (kept:number,actual:number) => kept + actual
const substractFunc = (kept:number,actual:number) => kept - actual
const multiplyFunc = (kept:number,actual:number) => kept * actual
const divideFunc = (kept:number,actual:number) => kept / actual


let themeToggler = document.querySelector('#theme-toggler #clicker');

if(themeToggler) {
    themeToggler.addEventListener('click', function(e) {
        let target = e.target as HTMLElement|null;
        if(target){
            if(target.classList.contains('theme-1')) setTheme('theme1')
            if(target.classList.contains('theme-2')) setTheme('theme2')
            if(target.classList.contains('theme-3')) setTheme('theme3')
        }
    });
}

// Calculator
let keys = document.querySelectorAll('#keys .key')
let result = document.querySelector('#result')
let keptValue = 0
let startOver = false
let toDecimal = false
let isDecimal = false
let operationFunc: (a:number, b:number) => number = addFunc

let reset = ()=>{
    keptValue = 0
    toDecimal = false
    isDecimal = false
    operationFunc = addFunc
    startOver = true
}

keys.forEach((key) => {
    key.addEventListener('click', function(e) {
        if(result) {
            let resultText = result.innerHTML
            let resultFloat = parseFloat(resultText.split(',').join(''))
            if(this.classList.contains('delete')){
                if(toDecimal) toDecimal = false     // if i had press on the dot
                if(resultText.length > 1) {     //if more than one number on the screen
                    let newValue = parseFloat(resultText.slice(0,-1).split(',').join(''))   //remove the last value
                    let newValueText = newValue.toString()
                    if(resultText.includes('.') && !newValueText.includes('.')) isDecimal = false   //if no longer decimal
                    resultFloat = newValue
                }else resultFloat = 0
            }else if(this.classList.contains('reset')){
                reset()
                resultFloat = 0
            }else if(this.classList.contains('sign')){
                let sign = this.innerHTML.toLowerCase()
                if(sign !== '.'){
                    if(keptValue !== 0){
                        resultFloat = operationFunc(keptValue, resultFloat)
                    }
                    keptValue = resultFloat
                    startOver = true
                }
                switch (sign) {
                    case '+':
                        operationFunc = addFunc
                        break;
                    case '-':
                        operationFunc = substractFunc
                        break;
                    case 'x':
                        operationFunc = multiplyFunc
                        break;
                    case '/':
                        operationFunc = divideFunc
                        break;
                    case '.':
                        if(!isDecimal) toDecimal = true
                        break;
                    default:
                        break;
                }
            }else if(this.classList.contains('equal')){
                resultFloat = operationFunc(keptValue,resultFloat)
                reset()
            }else{
                let number = parseInt(this.innerHTML.toLowerCase())
                if(toDecimal){
                    toDecimal = false
                    resultFloat = parseFloat(resultFloat.toString() + '.' + number.toString())
                    if(number !== 0) isDecimal = true
                }else{
                    resultFloat = parseFloat(resultFloat.toString() + number.toString())
                }
                if(startOver){
                    startOver = false
                    resultFloat = number
                }
            }
            
            result.innerHTML = new Intl.NumberFormat().format(resultFloat)
        }
    })
})
