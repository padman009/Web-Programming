drawShape(500);

function drawShape(size){
    var context = document.getElementById("canvas").getContext("2d");

    var radius = size / 15.5;

    document.getElementById("wrap").style.margin = `${((window.innerHeight - size) / 2) > 0 ?(window.innerHeight - size) / 2: 0}px auto`;
    document.getElementById("canvas").setAttribute('width', size);
    document.getElementById("canvas").setAttribute('height', size);

    var n = 6;
    context.lineWidth = radius / 25;
    while(--n > -1){
        drawCircle(((5 - n) * ((2 * radius) + radius / 2)) + 1.5 * radius, ((5 - n) * ((2 * radius) + radius / 2)) + 1.5 * radius, radius, '#' + (+n * Math.round(Math.pow(2, 24) / 5)).toString(16), context);
    }
}

function drawCircle(x, y, radius, color, context) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
}