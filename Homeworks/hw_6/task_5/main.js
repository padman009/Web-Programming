drawShape(500)

function drawShape(size){
    var context = document.getElementById("canvas").getContext("2d");

    var width = height = size;

    document.getElementById("wrap").style.margin = `${(window.innerHeight - height - 10) / 2}px auto`;
    document.getElementById("canvas").setAttribute('width', width);
    document.getElementById("canvas").setAttribute('height', height);

    context.fillRect(0, 0, width, height);

    context.clearRect(width / 6, height / 6, width * (2 / 3), height * (2 / 3));

    context.lineWidth = width / 80;
    context.strokeRect(width / 6 + width / 18, height / 6 + height / 18, width * (2 / 3) - width / 9, height * (2 / 3) - height / 9);
}