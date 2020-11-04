var playerX = {
		name: "X",
		value:1
	},
	playerO = {
		name: "O",
		value:-1
	},
	winCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	],
	blocks = [],
	size = Math.min(window.innerWidth, window.innerHeight) / 1.6,
	blockSize = size / 3,
	lineWidth = blockSize / 16,
	curr = document.getElementById("currPlayer"),
	canvas = document.getElementById("gameField")
	context = canvas.getContext("2d");
	marginLeft = (window.innerWidth - size) / 2,
	centeredField = function(){
		marginLeft = (window.innerWidth - size) / 2;
		canvas.setAttribute("style", `margin:0px ${marginLeft}px;position:absolute;top:200px;` );
	};

canvas.setAttribute("width", size);
canvas.setAttribute("height", size);

canvas.addEventListener("click", function(event){
	let [x, y] = [Math.floor((event.x - canvas.getBoundingClientRect().x) / blockSize), Math.floor((event.y - canvas.getBoundingClientRect().y) / blockSize)];
	click(blocks[(3 * y) + x]);
});

centeredField();
window.addEventListener("resize", ()=>centeredField());

window.addEventListener("keypress", function (e) {
	if (e.key > 0 && e.key < 10) {
		click(blocks[e.key - 1]);
	}
});

start();
function start() {
	drawLines();

	let fontSize = blockSize * 0.8;
	context.font = `${fontSize}px Arial`;
	let num = 0;
	for(let y = 0;y < 3;y++){
		for(let x = 0;x < 3;x++){
			blocks[num++] = [x, y, 0];
			context.fillText(num, ((x + 0.2) * blockSize), (y * blockSize) + fontSize);
		}
	}
}

function drawLines(){
	context.clearRect(0,0,size,size);
	context.fillStyle = "gray";
	for(let z = 1;z < 3;z++){
		context.fillRect(((0 + z) * blockSize) - (lineWidth / 2), 0, lineWidth, size);
		context.fillRect(0, ((0 + z) * blockSize) - (lineWidth / 2), size, lineWidth);
	}
}

function click(element) {
	if (element[2] !== 0) {
		return;
	}

	let [playerO_count, playerX_count] = countPoints();
	if(playerO_count + playerX_count == 0){
		drawLines();
	}
	set(element, playerX_count == playerO_count ? playerX : playerO);
	
	let winner = identifyWinner();
	if (winner.name !== "no") {
		end(winner);
	}else{
		checkOwerflow();
	}
}

function set(block, player) {
	block[2] = player.value;
	let x = block[0], y = block[1];
	let fontSize = blockSize * 0.8;
	context.fillStyle = "black";
	context.font = `${fontSize}px Arial`;
	context.fillText(player.name, ((x + 0.2) * blockSize), (y * blockSize) + fontSize);

	curr.innerText = player.name == playerX.name ? playerO.name : playerX.name;
}

function countPoints() {
	let count = [0,0];
	for(let num = 0;num < 9; num++){
		count[(blocks[num][2] < 0)?0:1]+=(blocks[num][2] !== 0)?1: 0;
	}
	return count;
}

function identifyWinner(){
	let w = winCombinations[0], name = "no";
	for(let x = 0;x < winCombinations.length;w=winCombinations[++x]){
		name = (Math.pow(blocks[w[0]][2] + blocks[w[1]][2] + blocks[w[2]][2], 2) === 9)?(blocks[w[0]][2] > 0)?"X":"O":name;
	}
	return  {name: name};
}

function checkOwerflow() {
	let [playerO_count, playerX_count] = countPoints();
	if (playerX_count + playerO_count === 9) {
		end({ name: "no" });
		return;
	} else if(playerX_count + playerO_count === 8){
		for(var z = 0;z < blocks.length;z++){
			if(blocks[z][2] === 0) break;
		}
		console.log(z);
		blocks[z][2]=1;
		let winner = identifyWinner();
		if (winner.name !== "no") {
			end(winner);
		}else{
			blocks[z][2]=-1;
			winner = identifyWinner();
			if (winner.name !== "no") {
				end(winner);
			}else{
				blocks[z][2] = 0;
			}
		}

	}
}

function end(winner) {
	setTimeout(function(){
		alert(winner.name=="no"?"Draw":`Winner ${winner.name}`);
		start();
	} ,50);
}