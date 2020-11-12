drawShape(250)

function drawShape(radius){
    var context = document.getElementById("canvas").getContext("2d");

    document.getElementById("wrap").style.margin = `${((window.innerHeight - (radius * 2) - 10) / 2) > 0 ?(window.innerHeight - (radius * 2) - 10) / 2: 0}px auto`;
    document.getElementById("canvas").setAttribute('width', radius * 2);
    document.getElementById("canvas").setAttribute('height', radius * 2);

    context.strokeStyle = 'red';
    context.lineWidth = radius / 100;

    context.beginPath();
    context.arc(radius, radius, radius - 2, 0, 2 * Math.PI, false);
    context.stroke();
}