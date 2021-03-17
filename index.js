const add = (a, b) => {
    return parseInt(a) + parseInt(b);
}
const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}
const divide = (a, b) => {
    return a/b;
}
const operate = (operator, a, b) => {
    return operator(a, b);
}

const input = document.querySelector('.input');

const numberBtns = document.querySelectorAll('.numberBtn');
const appendInput = (e) => {
    //input.value += String.fromCharCode(e.keyCode);
}
window.addEventListener('keydown', appendInput)
numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener('click', () => {
        if (operatorOn){
            operatorOn = false;
            input.value="";
            input.value += numberBtn.innerText;
        }else{
            input.value += numberBtn.innerText;
        }
    })
})

const clearAllValues = () => {
    input.value = "";
    storeValue = 0;
    storeOperator= "";
}
const clearBtn = document.querySelector('.clearBtn');
clearBtn.addEventListener('click', clearAllValues);

const backSpaceBtn = document.querySelector('.backSpaceBtn');
backSpaceBtn.addEventListener('click', () => 
input.value = input.value.toString().slice(0,-1));

const operatorBtns = document.querySelectorAll('.operatorBtn');
let storeValue = 0;
let storeOperator="";
let operatorOn = false;
const storeValues = (e) => {
    operatorOn = true;
    storeValue = input.value;
    storeOperator = e.target.id;
}
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', storeValues);
})

const addDecimal = () => {
    input.value += '.';
}
const decimalBtn = document.querySelector('.decimalBtn');
decimalBtn.addEventListener('click', addDecimal);


const evaluateBtn = document.querySelector('.evaluateBtn');
const getResult = () => {
    operatorOn = false;
    let operator = add;
    switch (storeOperator){
        case "add":
            operator = add;
            break;
        case "multiply":
            operator = multiply;
            break;
        case "divide":
            operator = divide;
            break;
        case "subtract":
            operator = subtract;
            break;
    }
    input.value = operate(operator, storeValue, input.value);
    storeValue = 0;
    operator = add;
}
evaluateBtn.addEventListener('click', getResult);