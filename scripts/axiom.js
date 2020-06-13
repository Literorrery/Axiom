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
const HB = 250;
const BIXBY_CONSTANT = 12;
const CRESSIDA_CONSTANT = 1000;
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

function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x);
}

function cantorDim(n) {
	return getBaseLog(3, Math.pow(2, n));
}

function genCantorDim(n) {
	return -1 * Math.log(2, 10)/Math.log(1/(n+1)/2, 10);
}

function triangle(num) {
	var i = 0;
	for (j = 1; j <= num; j++) {
		i = i + j;
	}
	return i;
}

function lazyCaterer(num) {
	return triangle(num)+1;
}

function profile(fn) {
	var start = new Date();
	fn();
	var end = new Date();
	var dur = end - start;
	//console.log("Duration: [" + dur + "]");
}

//---

function render(num, places) {
	if (num < Math.pow(10, places)) {
		return [num.toString(10), ""];
	} else {
		return num.toExponential(places).split("e+");
	}
}

function numberNode(nodeId, nodeType, number, places) {
	var node = document.createElement(nodeType);
	node.setAttribute("id", nodeId);
	var parts = render(number, places);
	var mantNode;
	if (parts[1] === "") {
		mantNode = document.createTextNode(parts[0]);
		node.appendChild(mantNode);
	} else {
		mantNode = document.createTextNode(parts[0]+"×10");
		node.appendChild(mantNode);
		expNode = document.createElement("sup");
		expNode.appendChild(document.createTextNode(parts[1]));
		node.insertAdjacentElement('beforeend', expNode);
	}
	return node;
}

function percentNode(nodeId, nodeType, number, places) {
	var node = document.createElement(nodeType);
	node.setAttribute("id", nodeId);
	number = number * 100;
	var mant, exp = render(number, places);
	var mantNode;
	if (exp === "") {
		mantNode = document.createTextNode(mant);
		node.appendChild(mantNode);
	} else {
		mantNode = document.createTextNode(mant+"&times;10");
		node.appendChild(mantNode);
		expNode = document.createElement("sup");
		expNode.appendChild(document.createTextNode(exp));
		node.insertAdjacentElement('beforeend', expNode);
	}
	var perc = document.createElement("p");
	perc.appendChild(document.createTextNode("%"));
	node.insertAdjacentElement('beforeend', perc);
	return node;
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
				echoBaseInterval: [],
				echoCurrInterval: [],
				echoProbability: []
			}
		}
	}
	r = player.red.successors;
	var c;
	for (i = 0; i < RED_LAYERS; i++) {
		r.count.push(0);
		r.echoCount.push(0);
		r.costBase.push(Math.ceil(Math.pow(BIXBY_CONSTANT, lazyCaterer(i))));
		r.costNext.push(Math.ceil(Math.pow(BIXBY_CONSTANT, lazyCaterer(i))));
		r.costFactor.push(Math.sqrt(1/Math.sqrt(genCantorDim(i+1))));
		c = genCantorDim(i+1);
		r.echoBaseInterval.push(CRESSIDA_CONSTANT * Math.pow(PHI,i));
		r.echoCurrInterval.push(CRESSIDA_CONSTANT * Math.pow(PHI,i));
		r.echoProbability.push(1 / (i+1));
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

function buildLabeledNumber(anchor, textLabel, nodeType, number, places) {
	var doc = document.createDocumentFragment();
	var h = document.createElement(nodeType);
	h.appendChild(document.createTextNode(textLabel));
	h.insertAdjacentElement('beforeend', numberNode("", "span", number, places));
	doc.appendChild(h);
	anchor.replaceChild(doc, anchor.childNodes[0]);
}

function redDisplayNumber(red) {
	var num = _node("redNumberDisplay", "h1", "numberDisplayMain");
	num.classList.add("redNumber");
	num.parentNode.replaceChild(numberNode("redNumberDisplay", "h1", red.number, 3), num);

	let i = 0;
	var node;
	while (STATE.red.succVisible[i]) {
		node = _node("red" + i + "SuccessorCount", "div", "numberDisplaySecondary");
		node.classList.add("redSuccessor");
		buildLabeledNumber(node, order(i) + " Successors: ", "h3", red.successors.count[i], 4);

		node = _node("red" + i + "SuccessorCost", "div", "numberDisplaySecondary");
		node.classList.add("redSuccessor");
		buildLabeledNumber(node, "Cost for next " + order(i) + " Successor: ", "h5", red.successors.costNext[i], 4);

		node = _node("red" + i + "EchoCount", "div", "numberDisplaySecondary");
		node.classList.add("redSuccessor");
		buildLabeledNumber(node, order(i) + " Echoes: ", "h4", red.successors.echoCount[i], 4);

		node = _node("red" + i + "EchoProbability", "div", "numberDisplaySecondary");
		node.classList.add("redSuccessor");
		buildLabeledNumber(node, order(i) + " Echo Probability: ", "h5", red.successors.echoProbability[i], 2);

		node = _node("red" + i + "EchoFrequency", "div", "numberDisplaySecondary");
		node.classList.add("redSuccessor");
		buildLabeledNumber(node, "Next " + order(i) + " Echo (ms): ", "h5", red.successors.echoCurrInterval[i], 4);

		i++;
	}
}
	
function redClickSuccessor(red, layer) {
	if (red.number >= red.successors.costNext[layer]) {
		red.number = red.number - red.successors.costNext[layer];
		red.successors.count[layer]++;
		red.successors.costNext[layer] = Math.ceil(red.successors.costNext[layer] * red.successors.costFactor[layer]);
		//console.log(
		//	"in layer " + layer + " " +
		//	"costFactor:" + red.successors.costFactor[layer] + " " +
		//	"costNext:" + red.successors.costNext[layer] + " " +
		//"");
	//} else {
		//console.log(
	//		"in layer " + layer + " " +
	//		"number (" + red.number + ") < red.successors.costNext (" + red.successors.costNext[layer] + ") " +
	//	"");
	}
	redDisplayNumber(red);
}

function createBoard(player) {
	r = player.red;
	redDisplayNumber(r);
	var btn = _node("redSuccessor", "button", "clickerDisplayMain");
	btn.classList.add("redSuccessor");
	btn.replaceChild(document.createTextNode("Zeroth-Order Successor"), btn.childNodes[0]);
}

function revealNextSuccessor(red, layer) {
	if ((layer == 0) || red.number > red.successors.costBase[layer - 1]) {
		var btn = _node("red" + layer + "SuccessorButton", "button", null);
		if (btn === null) {
			btn = _node("red" + layer + "SuccessorButton", "button", "clickerDisplaySecondary");
			btn.classList.add("redSuccessor");
			btn.replaceChild(document.createTextNode(order(layer) + "Successor"), btn.childNodes[0]);
			btn.addEventListener('click', function() {
				redClickSuccessor(red, layer);
			});
			//console.log("revealNextSuccessor(red, " + layer + "): Adding redClickSuccessor(red, " + layer + ") to button \"" + order(layer) + "Successor");
		}
		return true;
	} else {
		//console.log("revealNextSuccessor(red, " + layer + "): number (" + red.number + ") < costNext[" + layer + "](" + red.successors.costBase[layer]);
		return false;
	}
}

function incRed(red) {
	var layer = 0;
	while (STATE.red.succVisible[layer]) {
		var echoes = red.successors.count[layer] + red.successors.echoCount[layer];
		red.successors.echoCurrInterval[layer] -= HB;
		if (red.successors.echoCurrInterval[layer] < 0) {
			if (layer === 0) {
				red.number += echoes;
			} else {
				var b = getBaseLog(12, echoes / 2);
				var batchCount = Math.floor(b);
				console.log("layer: " + layer + ", echoes: " + echoes + ", getBaseLog(12, " + echoes + "/2): " + b + ", batch count: " + batchCount);
				while (batchCount > 0) {
					var batchSize = Math.floor(echoes / (2 * batchCount));
					console.log("layer: " + layer + ", echoes: " + echoes + ", batch count: " + batchCount + ", batch size: " + batchSize);
					for (var eachBatch = 0; eachBatch < batchCount; eachBatch++) {
						//debugger;
						r = Math.random();
						if (r < red.successors.echoProbability[layer]) {
							l = layer - 1;
							red.successors.echoCount[l] += batchSize;
							console.log("layer: " + layer + " adds " + batchSize + " echoes to layer " + l + " in batch " + eachBatch);
						}
						echoes -= batchSize;
						console.log("new echoes: " + echoes);
					}
					b = getBaseLog(12, echoes / 2);
					batchCount = Math.floor(b);
				}
				for (eachBatch = 0; eachBatch < echoes; eachBatch++) {
					r = Math.random();
					if (r < red.successors.echoProbability[layer]) {
						//console.log(r + " < " + red.successors.echoProbability[layer]);
						red.successors.echoCount[layer-1]++;
						//let l = layer-1;
						//console.log("red.successors.echoCount[" + l + "]++;");
					} else {
						//console.log(r + " >= " + red.successors.echoProbability[layer]);
					}
				}
			}
			red.successors.echoCurrInterval[layer] += red.successors.echoBaseInterval[layer];
		}
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
}

function heartBeat(player) {
	STATE.COUNTER++;
	incRed(player.red);
	redClickNumber(player.red);
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
		profile(function() {
			heartBeat(player_obj);
		});
	}, HB);
}

main() // And there was.

// ---
