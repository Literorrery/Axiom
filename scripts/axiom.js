/*
 * Axiom: A game of natural philosophy.
 * Tiers:
 * 0
 * The Red Jacket: Mathematics -- three ways to get to infinity
 * -- addition, multiplication, exponentiation
 * The Orange Jacket: Three Primes: Subatomic Theory - four ways to get to infinity
 * -- addition-dominant: salt
 * -- multiplication-dominant: quicksilver
 * -- exponentiation-dominant: sulphur
 * -- introduces subtraction, division, roots
 * The Yellow Jacket: Five Elements: Base Alchemical Theory - seven ways to get to infinity
 * -- 1 sulphur, 1 salt, 1 quicksilver -- 1 prima-materia
 * -- 4 prima materia - fire
 * -- 6 prima materia - earth
 * -- 8 prima materia - air
 * -- 12 prima materia - aether
 * -- 20 prima materia - water
 * The Green Jacket: Seven Metals: High Alchemy -- XXX ways to get to infinity
 * -- Royal Earth - Lead
 * -- Royal Air - Tin
 * -- Royal Fire - Iron
 * -- Royal Water - Copper
 * -- Royal Aether - Mercury
 * -- Anacycle - Silver
 * -- Catacycle - Gold
 * The Indigo Jacket: XXX Planets: Astrology seven gateways of infinity
 * -- Gold -> Sun
 * -- Silver -> Moon
 * -- Mercury -> Mercury
 * -- Copper -> Venus
 * -- Iron -> Mars
 * -- Jupiter -> Jupiter
 * -- Saturn -> Saturn
 * The Violet Jacket: Layers of the Divine: Theurgy -- Several
 * -- God-forms of each of the previous layers
 * -- Aleph-null: God-0, click
 * -- Aleph-1: Addition
 * -- Aleph-2: Multiplication
 * -- Aleph-19: Copper
 *  20 mercury
 *  21 silver
 *  22 gold
 *  23 sun
 *  24 moon
 *  25 mer
 *  26 ve
 *  27 ma
 *  28 ju
 * -- Aleph-29: Saturn
 * -- Aleph-30: Aleph-Null
 * -- Aleph-31: Aleph-1
 * -- Aleph-32: Aleph-2
 * -- Aleph-33: ...
 * The Black Jacket: 1 axiom: Faith -- one way to get to infinity alephs
 * -- Alephs
 * Lemniscate
 * -- Splits in half
 * -- half fades
 * -- Half colore in red, shifts over
 * -- Zero
 */

const jacketNumberDisplay = document.querySelector('.jacketNumberDisplay');
const jacketClickers = document.querySelector('.jacketClickers');
const jacketPerms = document.querySelector('.jacketPerms');
const saveLink = document.querySelector('.saveLink');
const loadLink = document.querySelector('.loadLink');
const resetLink = document.querySelector('.resetLink');
const DENI_CONSTANT = Math.pow(Math.E, (Math.PI / Math.SQRT2))
const PHI = (1 + Math.sqrt(5))/2
const ORDERS = [
		"First",
		"Second",
		"Third",
		"Fourth",
		"Fifth",
		"Sixth",
		"Seventh",
		"Eighth",
		"Ninth",
		"Tenth",
		"Eleventh",
		"Twelfth",
		"Thirteenth",
		"Fourteenth",
		"Fifteenth",
		"Sixteenth",
		"Seventeenth",
		"Eighteenth",
		"Nineteenth",
		"Twentieth",
		"Twenty-First",
		"Twenty-Second",
		"Twenty-Third",
		"Twenty-Fourth",
		"Twenty-Fifth",
		"Twenty-Sixth"
];

function triangle(num) {
	var i = 0;
	for (j = 1; j <= num; j++) {
		i = i + j;
	}
	return i;
}


function render(num) {
	if (num < 1000) {
		return num.toString(10);
	} else {
		return num.toExponential(3).replace("e+", "&times;10<sup>") + "<sup>";
	}
}

function newPlayer() {
	var player = {
		jacket: "red",
		red: {
			redNumber: 0,
			redSuccessors: {
				redSuccCount: [],
				redEchoCount: [],
				redSuccBase: [],
				redSuccNext: [],
				redSuccNextFactor: [],
				redEchoInterval: [],
				redEchoProbability: [],
				redSuccVisible: []
			}
		}
	}
	for (i = 0; i < 24; i++) {
		player.red.redSuccessors.redSuccCount.push(0);
		player.red.redSuccessors.redEchoCount.push(0);
		player.red.redSuccessors.redSuccBase.push(Math.ceil(Math.pow(DENI_CONSTANT, triangle(i+1))));
		player.red.redSuccessors.redSuccNext.push(Math.ceil(Math.pow(DENI_CONSTANT, triangle(i+1))));
		player.red.redSuccessors.redSuccNextFactor.push(2 - 1/(1 + i/DENI_CONSTANT));
		player.red.redSuccessors.redEchoInterval.push(Math.pow(PHI,i));
		player.red.redSuccessors.redEchoProbability.push(1 / Math.pow(i+1));
		player.red.redSuccessors.redSuccVisible.push(false);
	}
	return player;
}

function loadPlayer() {
	var player;
	if (localStorage.getItem("axiomPlayer")) {
		player = JSON.parse(localStorage.getItem("axiomPlayer"));
		console.log("Loading: %o", player);
	} else {
		player = newPlayer();
		console.log("Creating new player.");
	}
	return player;
}

function savePlayer(player) {
	localStorage.setItem("axiomPlayer", JSON.stringify(player));
	console.log("Saving.");
}

function resetPlayer() {
	localStorage.removeItem("axiomPlayer");
	console.log("Reseting.");
}

function redClickSuccessor(r) {
	console.log("before r.redNumber: " + r.redNumber);
	r.redNumber = r.redNumber + 1;
	console.log("after r.redNumber: " + r.redNumber);
	redDisplayNumber(r);
}

function redDisplayNumber(r) {
	var num = document.createElement("h1");
	num.setAttribute("id", "redNumber");
	num.appendChild(document.createTextNode(render(r.redNumber)));
	jacketNumberDisplay.replaceChild(num, jacketNumberDisplay.childNodes[0]);
}
	

function createBoard(player) {
	redDisplayNumber(player.red);
	var btn = document.createElement("button");
	btn.appendChild(document.createTextNode("Zeroth-Order Successor"));
	btn.setAttribute("id", "redButton");
	btn.classList.add("redZerothSuccessor");
	btn.addEventListener('click', function() {
		redClickSuccessor(player.red);
	});
	jacketClickers.appendChild(btn);
}

function main() {  // Let there be.
	var player_obj = loadPlayer();
	loadLink.addEventListener('click', function() {
		player_obj = loadPlayer();
	});
	saveLink.addEventListener('click', function() {
		savePlayer(player_obj);
	});
	resetLink.addEventListener('click', function() {
		resetPlayer();
		player_obj = newPlayer();
		window.location.reload(false);
	});
	createBoard(player_obj);
}

main() // And there was.

// ---


