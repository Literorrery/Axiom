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
 * The Cyan Jacket: XXX Planets: Astrology seven gateways of infinity
 * -- Gold -> Sun
 * -- Silver -> Moon
 * -- Mercury -> Mercury
 * -- Copper -> Venus
 * -- Iron -> Mars
 * -- Jupiter -> Jupiter
 * -- Saturn -> Saturn
 * The Blue Jacket: 
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
		"Twenty-Sixth",
		"Twenty-Seventh"
];

const STATE = {
	RED: {
	},
	ORANGE: {
	},
	YELLOW: {
	},
	GREEN: {
	},
	CYAN: {
	},
	BLUE: {
	},
	VIOLET: {
	},
	GREY: {
	}
};

function order(n) {
	return CARDINALS[n] + "-Order";
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

function newPlayer() {
	var player = {
		jacket: "red",
		mainCounter: 0,
		red: {
			number: 0,
			layers: 1,
			succCount: [],
			echoCount: [],
			succPower: [],
			costBase: [],
			costNext: [],
			probNumer: [],
			probDenom: [],
			intervalMax: [],
			intervalNext: [],
			emphasisCount: [],
			emphasisCostBase: [],
			emphasisCostNext: [],
			focusCount: [],
			focusCostBase: [],
			focusCostNext: [],
			impetusCount: [],
			impetusCostBase: [],
			impetusCostNext: []
		}
	}
	r = player.red;
	var c;
	r.succCount.push(0);
	r.echoCount.push(0);
	r.succPower.push(1);
	r.costBase.push(Math.ceil(Math.pow(BIXBY_CONSTANT, lazyCaterer(0))));
	r.costNext.push(Math.ceil(Math.pow(BIXBY_CONSTANT, lazyCaterer(0))));
	r.probNumer.push(1);
	r.probDenom.push(1);
	r.intervalMax.push(1000);
	r.intervalNext.push(1000);
	r.emphasisCount.push(0);
	r.emphasisCostBase.push(10);
	r.emphasisCostNext.push(10);
	r.focusCount.push(0);
	r.focusCostBase.push(50);
	r.focusCostNext.push(50);
	r.impetusCount.push(0);
	r.impetusCostBase.push(100);
	r.impetusCostNext.push(100);
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
	var save = player;
	localStorage.setItem("axiomPlayer", JSON.stringify(player));
	console.log("Saving.");
}

function resetPlayer() {
	localStorage.removeItem("axiomPlayer");
	console.log("Reseting.");
}

function redDisplayNumber(red) {
	var num = document.getElementById("redNous");
	var par = num.parentNode;
	par.replaceChild(numberNode("redNous", "span", red.number, 3), num);

	var node;
	for (layer = 0; layer < red.layers; layer++) {
		node = document.getElementById("red" + layer + "SuccessorCount");
		par = node.parentNode;
		par.replaceChild(numberNode("red" + layer + "SuccessorCount", "span", red.succCount[layer], 3), node);

		node = document.getElementById("red" + layer + "SuccessorCost");
		par = node.parentNode;
		par.replaceChild(numberNode("red" + layer + "SuccessorCost", "span", red.costNext[layer], 3), node);
	}
}

function redAddLayer(red, layer) {
	var node = document.createElement("div");
	node.id = "red" + layer + "SuccessorPrimaryDisplay";
	node.classList.add("red");
	node.classList.add("innerDisplay");
	var head = document.createElement("h3");
	head.onclick = function() {
		divToggle("red" + layer + "SuccessorInnerDisplay");
	};
	head.innerText = order(layer);
	node.appendChild(head);
	var inner = document.createElement("div");
	inner.id = "red" + layer + "SuccessorInnerDisplay";
	inner.style.display = "none";
	var a = document.createElement("div");
	a.classList.add("red");
	a.classList.add("a");
	var echoList = document.createElement("ul");
	a.appendChild(echoList);
	var succs = document.createElement("li");
	succs.innerHTML = '<li><span id="red' + layer + 'SuccessorCount">0</span> <span id="red' + layer + 'Successor">Successors</span><br/>(Next available at <span id="red' + layer + 'SuccessorCost"></span>)</li>';
	echoList.appendChild(succs);
	var echoes = document.createElement("li");
	echoes.innerHTML = '<li><span id="red' + layer + 'EchoCount">0</span> <span id="red' + layer + 'Echo">Echoes</span></li>';
	echoList.appendChild(echoes);
	inner.appendChild(a);

	var b = document.createElement("div");
	b.classList.add("red");
	b.classList.add("b");
	var p = document.createElement("p");
	var produces;
	if (layer === 0) {
		produces = "nous";
	} else {
		produces = order(layer-1) + " Echoes";
	}

	p.innerHTML = '<p>have a <span id="red' + layer + 'EchoProbNumer"></span>:<span id="red' + layer + 'EchoProbDenom"></span> chance of producing <em>' + produces + '</em> in <span id="red' + layer + 'IntervalNext"></span>ms</p>';
	b.appendChild(p);
	inner.appendChild(b);
	
	var c = document.createElement("div");
	c.style.clear = "both";
	c.appendChild(document.createElement("hr"));
	var boostList = document.createElement("ul");
	var emphasi = document.createElement("li");
	emphasi.innerHTML = '<li><span id="red' + layer + 'EmphasisCount">0</span> <em>Emphasi</em> boosting echo intensity<br/>(Next available at <span id="red' + layer + 'EmphasisCost"></span> echoes)</li>';
	boostList.appendChild(emphasi);
	var foci = document.createElement("li");
	foci.innerHTML = '<li><span id="red' + layer + 'FocusCount">0</span> <em>Foci</em> boosting echo probability<br/>(Next available at <span id="red' + layer + 'FocusCost"></span> emphasi)</li>';
	boostList.appendChild(foci);
	var impeti = document.createElement("li");
	impeti.innerHTML = '<li><span id="red0ImpetusCount">0</span> <em>Impeti</em> boosting echo frequency<br/>(Next available at <span id="red' + layer + 'ImpetusCost"></span> foci)</li>';
	boostList.appendChild(impeti);
	c.appendChild(boostList);

	inner.appendChild(c);
	node.appendChild(inner);

	var root = document.getElementById("redSuccessorDisplay")
	root.insertAdjacentElement("afterbegin", node);

	
}
	
function incRed(red) {
	for (layer = 0; layer < red.layers; layer++) {
		var echoes = red.succCount[layer] + red.echoCount[layer];
		red.intervalNext[layer] -= HB;
		if (red.intervalNext[layer] < 0) {
			if (layer === 0) {
				red.number += echoes;
			} else {
				var b = getBaseLog(12, echoes / 2);
				var batchCount = Math.floor(b);
				while (batchCount > 0) {
					var batchSize = Math.floor(echoes / (2 * batchCount));
					for (var eachBatch = 0; eachBatch < batchCount; eachBatch++) {
						//debugger;
						r = Math.random();
						if (r < (red.probNumer[layer] / red.probDenom)) {
							l = layer - 1;
							red.successors.echoCount[l] += batchSize;
						}
						echoes -= batchSize;
					}
					b = getBaseLog(12, echoes / 2);
					batchCount = Math.floor(b);
				}
				for (eachBatch = 0; eachBatch < echoes; eachBatch++) {
					r = Math.random();
					if (r < (red.probNumer[layer] / red.probDenom)) {
						red.echoCount[layer-1]++;
					}
				}
			}
			red.intervalNext[layer] += red.intervalMax[layer];
		}
	}
	if (red.number > red.costBase[red.layers - 1]) {
		redAddLayer(red, red.layers);
		red.succCount.push(0);
		red.echoCount.push(0);
		red.succPower.push(1);
		red.costBase.push(Math.ceil(Math.pow(BIXBY_CONSTANT, lazyCaterer(red.layers))));
		red.costNext.push(Math.ceil(Math.pow(BIXBY_CONSTANT, lazyCaterer(red.layers))));
		red.probNumer.push(1);
		red.probDenom.push(red.layers+1);
		red.intervalMax.push(Math.ceil(Math.pow(PHI, red.layers) * 1000));
		red.intervalNext.push(Math.ceil(Math.pow(PHI, red.layers) * 1000));
		red.emphasisCount.push(0);
		red.emphasisCostBase.push(10);
		red.emphasisCostNext.push(10);
		red.focusCount.push(0);
		red.focusCostBase.push(50);
		red.focusCostNext.push(50);
		red.impetusCount.push(0);
		red.impetusCostBase.push(100);
		red.impetusCostNext.push(100);
		red.layers++;
	}
}

function heartBeat(player) {
	player.mainCounter++;
	incRed(player.red);
	redClickNumber(player.red);
}

function redClickNumber(red) {
	red.number++;
	redDisplayNumber(red);
}

function drawBoard(player) {
	for (layer = 0; layer < player.red.layers; layer++) {
		redAddLayer(player.red, layer);
	}
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
	drawBoard(player_obj);
	
	setInterval(function() {
		heartBeat(player_obj);
	}, HB);
}

main() // And there was.

// ---


