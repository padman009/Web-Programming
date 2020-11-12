var result = document.getElementById("result"),
    input = document.getElementById("radius");

function calculate(){
    if(validateDigit(input.value)){
        result.innerHTML = `V = ${calcVolume(+input.value)}`;
    }else{
        result.innerHTML = ""
        alert("Please Enter only numbers!!!");
    }
}

function calcVolume(radius){
    return (4 / 3) * (Math.pow(radius, 3) * Math.PI);
}

function validateDigit(number){
    return Number.isInteger(Number(number));
}