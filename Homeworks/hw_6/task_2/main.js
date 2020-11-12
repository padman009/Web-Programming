var result = document.getElementById("result"),
    input = document.getElementById("temperature");

function calculate(comand){
    if(validateDigit(input.value)){
        let digit = +input.value;
        if(comand === "cf"){
            result.innerHTML = `${digit}℃ is ${cf(digit)}℉`;
        }else {
            result.innerHTML = `${digit}℉ is ${fc(digit)}℃`;
        }
    }else{
        result.innerHTML = ""
        alert("Please Enter only numbers!!!");
    }
}

function cf(digit){
    return ((digit / 5) * 9) + 32;
}

function fc(digit){
    return ((digit - 32) / 9) * 5;
}

function validateDigit(number){
    return Number.isInteger(Number(number));
}