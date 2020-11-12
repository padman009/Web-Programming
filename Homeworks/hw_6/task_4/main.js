var result = document.getElementById("result"),
    input = document.getElementById("digit");

function calculate(){
    if(validateDigit(input.value)){
        result.innerHTML = reverse(input.value);
    }else{
        input.innerHTML = "";
        result.innerHTML = "";
        alert("Please Enter only numbers!!!");
    }
}

function reverse(digit){
    return digit.split("").reverse().join("");
}

function validateDigit(variable){
    return Number.isInteger(Number(variable));
}