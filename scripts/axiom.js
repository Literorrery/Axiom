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

const saveLink = document.querySelector('.saveLink');
const loadLink = document.querySelector('.loadLink');
const resetLink = document.querySelector('.resetLink');
const DENI_CONSTANT = Math.pow(Math.E, (Math.PI / Math.SQRT2))
const PHI = (1 + Math.sqrt(5))/2
const CARDINALS = [
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
const STATE = {
};
const RED_LAYERS = 24;

function order(n) {
	return CARDINALS[n] + "-Order ";
}

function triangle(num) {
	var i = 0;
	for (j = 1; j <= num; j++) {
		i = i + j;
	}
	return i;
}
//---

function render(num) {
	if (num < 1000) {
		return num.toString(10);
	} else {
		parts = num.toExponential(3).split("e+");
		return parts[0] + "×10" + parts[1].sup();
	}
}

function createState(player) {
	STATE.COUNTER = 0;
	STATE.red = {
		succVisible: []
	};
	for (i = 0; i < RED_LAYERS; i++) {
		STATE.red.succVisible.push(revealNextSuccessor(player.red, i));
	}
}

function newPlayer() {
	var player = {
		jacket: "red",
		red: {
			number: 0,
			successors: {
				count: [],
				echoCount: [],
				costBase: [],
				costNext: [],
				costFactor: [],
				echoInterval: [],
				echoProbability: []
			}
		}
	}
	r = player.red.successors;
	for (i = 0; i < RED_LAYERS; i++) {
		r.count.push(0);
		r.echoCount.push(0);
		r.costBase.push(Math.ceil(Math.pow(DENI_CONSTANT, triangle(i+1))));
		r.costNext.push(Math.ceil(Math.pow(DENI_CONSTANT, triangle(i+1))));
		r.costFactor.push(2 - 1/(1 + (i+1)/DENI_CONSTANT));
		r.echoInterval.push(Math.pow(PHI,i));
		r.echoProbability.push(1 / Math.pow(i+1));
	}
	createState(player);
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

	// Create State.
	createState(player);

	return player;
}

function savePlayer(player) {
	var save = player;
	localStorage.setItem("axiomPlayer", JSON.stringify(player));
	console.log("Saving.");
}

function resetPlayer() {
	localStorage.removeItem("axiomPlayer");
	console.log("Reseting.");
}

function _node(nodeId, nodeType, nodeParent) {
	var node = document.getElementById(nodeId);
	if (node === null) {
		if (nodeParent === null) {
			return null;
		}
		node = document.createElement(nodeType);
		node.setAttribute("id", nodeId);
		node.appendChild(document.createTextNode(""));
		document.getElementById(nodeParent).appendChild(node);
		console.log("*** added " + nodeId + " to " + nodeParent + " ***");
	}
	return node;
}

function redDisplayNumber(red) {
	var num = _node("redNumberDisplay", "h1", "numberDisplayMain");
	num.classList.add("redNumber");
	num.childNodes[0].textContent = render(red.number);

	let i = 0;
	var doc;
	while (STATE.red.succVisible[i]) {
		doc = _node("red" + i + "SuccessorCount", "h3", "numberDisplaySecondary");
		doc.classList.add("redSuccessor");
		doc.childNodes[0].textContent = 
			r.successors.count[i]
				+ " "
				+ order(i)
				+ "Successors (plus "
				+ r.successors.echoCount[i]
				+ " "
				+ order(i)
				+ "Echoes); "
				+ render(r.successors.costNext[i])
				+ " for next";
		i++;
	}
}
	
function redClickSuccessor(red, layer) {
	if (red.number >= red.successors.costNext[layer]) {
		red.number = red.number - red.successors.costNext[layer];
		red.successors.count[layer]++;
		red.successors.costNext[layer] = Math.ceil(red.successors.costNext[layer] * red.successors.costFactor[layer]);
		console.log(
			"in layer " + layer + " " +
			"costFactor:" + red.successors.costFactor[layer] + " " +
			"costNext:" + red.successors.costNext[layer] + " " +
		"");
	} else {
		console.log(
			"in layer " + layer + " " +
			"number (" + r.redNumber + ") < red.successors.costNext (" + red.successors.costNext[layer] + ") " +
		"");
	}
	redDisplayNumber(r);
}

function createBoard(player) {
	r = player.red;
	redDisplayNumber(r);
	var btn = _node("redSuccessor", "button", "clickerDisplayMain");
	btn.classList.add("redSuccessor");
	btn.replaceChild(document.createTextNode("Zeroth-Order Successor"), btn.childNodes[0]);
}

function revealNextSuccessor(red, layer) {
	if (red.number * 2 > red.successors.costBase[layer]) {
		var btn = _node("red" + layer + "SuccessorButton", "button", null);
		if (btn === null) {
			btn = _node("red" + layer + "SuccessorButton", "button", "clickerDisplaySecondary");
			btn.replaceChild(document.createTextNode(order(layer) + "Successor"), btn.childNodes[0]);
			btn.addEventListener('click', function() {
				redClickSuccessor(red, layer);
			});
			console.log("revealNextSuccessor(red, " + layer + "): Adding redClickSuccessor(red, " + layer + ") to button \"" + order(layer) + "Successor");
		}
		return true;
	} else {
		console.log("revealNextSuccessor(red, " + layer + "): number (" + red.number + ") < costNext[" + layer + "](" + red.successors.costBase[layer]);
		return false;
	}
}

function heartBeat(player) {
	STATE.COUNTER++;
	var red = player.red;
	var layer = 0;
	red.number = red.number + red.successors.count[0];
	red.number = red.number + red.successors.echoCount[0];
	while (STATE.red.succVisible[layer]) {
		red.successors.echoCount[layer] = red.successors.echoCount[layer] + red.successors.count[layer+1];
		layer++;
	}
	if (layer === RED_LAYERS) {
		console.log(
			"Counter:" + STATE.COUNTER + " " +
			"layer:" + layer + " " +
			"All Successors added; nothing to do.");
	} else {
		STATE.red.succVisible[layer] = revealNextSuccessor(red, layer);
	}
	redClickNumber(red);
}

function redClickNumber(red) {
	red.number++;
	redDisplayNumber(red);
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
	setInterval(function() {
		heartBeat(player_obj);
	}, 250);
}

main() // And there was.

// ---
