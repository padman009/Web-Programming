var result = document.getElementById("result"),
    first = document.getElementById("first"),
    second = document.getElementById("second");

function calculate(comand){
    let [a,b] = [first.value, second.value];
    if(validateDigit(a) && validateDigit(b)){
        if(comand === "mult"){
            result.innerHTML = multiply(a, b);
        }else {
            result.innerHTML = divide(a, b);
        }
    }else{
        first.value = !validateDigit(a) ? "":a;
        second.value = !validateDigit(b) ? "":b;
        result.innerHTML = "";
        alert("Please Enter only numbers!!!");
    }
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function validateDigit(number){
    return Number.isInteger(Number(number));
}
        