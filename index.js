const add = (a, b) => {
    return parseFloat(a) + parseFloat(b);
}
const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}
const divide = (a, b) => {
    if (b == 0){
        disableBtns(true);
        return "Cannot be divided by zero";
    }
    return a/b;
}
const operate = (operator, a, b) => {
    return operator(a, b);
}

const input = document.querySelector('.input');

const clickBtn = (e) => {
    // get button and click (multiply not working correctly)
    const btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (btn != null)
        btn.click();
}
window.addEventListener('keydown', clickBtn)

function disableBtns(bool){
    clearBtn.disabled = bool;
    decimalBtn.disabled = bool;
    backSpaceBtn.disabled = bool;
    operatorBtns.forEach(operatorBtn => operatorBtn.disabled = bool);
}

const clearBtn = document.querySelector('.clearBtn');
clearBtn.addEventListener('click', clearAllValues);
function clearAllValues() {
    disableBtns(false);
    input.value = 0;
    storeValue = 0;
    storeOperator= "";
    operatorOn = false;
    evaluatedAns = false;
}

const backSpaceBtn = document.querySelector('.backSpaceBtn');
backSpaceBtn.addEventListener('click', () => {
    if (input.value.toString().length==1)
        return input.value = 0;
    input.value = input.value.toString().slice(0,-1);
});

const numberBtns = document.querySelectorAll('.numberBtn');
numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener('click', () => {
        if (input.value === "Cannot be divided by zero") {
            clearAllValues();
            input.value = numberBtn.innerText;
        } else if (input.value === "0") {
            input.value = numberBtn.innerText;
        }
        else if (operatorOn == true || evaluatedAns == true) {
            evaluatedAns = false;
            operatorOn = false;
            disableBtns(false);
            input.value = "";
            input.value += numberBtn.innerText;
        } else {
            input.value += numberBtn.innerText;
        }
    })
})

const operatorBtns = document.querySelectorAll('.operatorBtn');
let storeValue = 0;
let storeOperator="";
let operatorOn = false;
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', storeValuesAndCalculate);
})
function storeValuesAndCalculate(e) {
    if (storeValue != "0" && input.value != "" && operatorOn == false){
        getResult();
    }
    operatorOn = true;
    storeValue = input.value;
    storeOperator = e.target.id;
}

const decimalBtn = document.querySelector('.decimalBtn');
decimalBtn.addEventListener('click', addDecimal);
function addDecimal() {
    if (!input.value.includes(".") && evaluatedAns == true){
        input.value = '0.';
    }else if (!input.value.includes(".") && operatorOn == false){
        input.value += '.';
    }
    else {
        input.value = '0.';
    }
    operatorOn = false;
    evaluatedAns = false;
}

const evaluateBtn = document.querySelector('.evaluateBtn');
let evaluatedAns = false;
evaluateBtn.addEventListener('click', getResult);
function getResult() {
    operatorOn = false;
    if (input.value != "Cannot be divided by zero"){
        let result = operate(getOperator(), storeValue, input.value); 
        if (result == "Cannot be divided by zero"){
            // skip next test
        }
        else if (result%1 != 0)
            result = Math.round(result * 10000000)/10000000;
        input.value = result;
        evaluatedAns = true;
    }
    else{
        clearAllValues();
    }
    storeValue = 0;
    storeOperator = "";
    operator = add;
}

function getOperator(){
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
    return operator;
}
