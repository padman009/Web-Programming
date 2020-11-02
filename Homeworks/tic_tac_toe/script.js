var playerX = { name: "X" },
	playerO = { name: "O" };

var blocks = document.getElementsByClassName("block");

start();

window.addEventListener("keypress", function (e) {
	if (e.key > 0 && e.key < 10) {
		click(blocks[e.key - 1]);
	}
});

function click(element) {
	if (
		element.classList.contains(playerX.name) ||
		element.classList.contains(playerO.name)
	) {
		return;
	}

	let playerO_count = countPoints(playerO);
	let playerX_count = countPoints(playerX);

	set(element, playerX_count == playerO_count ? playerX : playerO);

	let winner = identifyWinner();
	let winX = winner == playerX;
	let winO = winner == playerO;

	if (winX ^ winO) {
		end(winX ? playerX : playerO);
	}else{
		checkOwerflow();
	}
}

function start() {
	let x = 1;
	Array.from(blocks).forEach((element) => {
		element.addEventListener("click", click);

		let canvas = element.hasChildNodes()
			? element.childNodes[0]
			: document.createElement("canvas");
		while (canvas.hasChildNodes()) {
			canvas.removeChild(canvas.childNodes[0]);
		}
		canvas.setAttribute("width", "135");
		canvas.setAttribute("height", "130");
		canvas.display = "block";
		element.appendChild(canvas);
		element.classList.remove(element.classList.contains("X") ? "X" : "O");
	});
}

function identifyWinner(){
	
}

function checkOwerflow() {
	playerO_count = countPoints(playerO);
	playerX_count = countPoints(playerX);

	if (playerX_count + playerO_count == 9) {
		end({ name: "NO" });
		return;
	}
}

function countPoints(player) {
	let count = 0;
	Array.from(blocks).forEach((element) => {
		if (element.classList.contains(player.name)) {
			count++;
		}
	});
	return count;
}

function set(block, player) {
	block.classList.add(player.name);
	let context = block.childNodes[0].getContext("2d");
	context.fillStyle = "red";
	context.font = "120px Arial";
	context.fillText(player.name, 20, 120);

	let curr = document.getElementById("curr_player");
	curr.innerText = player.name == playerX.name ? playerO.name : playerX.name;
}

function end(winner) {
	alert(winner.name == "NO" ? "Ничья" : "Winner " + winner.name);
	start();
}