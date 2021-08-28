/*
 * Axiom: A game of natural philosophy.
 * Tiers:
 * 0
 * The Red Jacket: Mathematics -- three ways to get to infinity
 * -- addition, multiplication, exponentiation
 * The Orange Jacket: Three Primes: Subatomic Theory - five ways to get to infinity
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

import {BigNumber} from "../node_modules/bignumber.js/bignumber.mjs";
import {Decimal} from "../node_modules/decimal.js-light/decimal.mjs";

BigNumber.config({ ALPHABET: '0123456789TE', EXPONENTIAL_AT: 5, DECIMAL_PLACES: 4 })

const saveLink = document.querySelector('.saveLink');
const loadLink = document.querySelector('.loadLink');
const resetLink = document.querySelector('.resetLink');
const HB = 1000/30;
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
];

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

function newPlayer() {
	return {
		version: "0.0.1",
		jacket: "red",
		mainCounter: Decimal(0),
		red: {
			zero: {
				depth: 0,
				nous: Decimal(0),
				impetus: Decimal(1),
				streak: 0,
			},
			one: {
				depth: 1,
				visibleAt: Decimal(12**1)/2,
				cost: Decimal(12**1),
				power: Decimal(13.0*(12.0**0)+0)/(12.0**1),
				oddsNumerator: Decimal(1),
				oddsDenominator: Decimal(2),
				count: Decimal(0),
				echoes: Decimal(0),
				impetus: Decimal(1),
				interval: Decimal(Math.floor(864*Math.pow(PHI, 0))),
				nextIn: Decimal(Math.floor(864*Math.pow(PHI, 0))),
			},
			two: {
				depth: 2,
				isZero: false,
				visibleAt: Decimal((12**2)/2),
				cost: Decimal(12**2),
				power: Decimal(13.0*(12.0**1)+(12.0**0))/(12.0**2),
				oddsNumerator: Decimal(1),
				oddsDenominator: Decimal(3),
				count: Decimal(0),
				echoes: Decimal(0),
				impetus: Decimal(1),
				interval: Decimal(Math.floor(864*Math.pow(PHI, 1))),
				nextIn: Decimal(Math.floor(864*Math.pow(PHI, 1))),
			},
			three: {
				depth: 3,
				isZero: false,
				visibleAt: Decimal((12**3)/2),
				cost: Decimal(12**3),
				power: Decimal((13.0*(12.0**2)+(12.0**1))/(12.0**3)),
				oddsNumerator: Decimal(1),
				oddsDenominator: Decimal(4),
				count: Decimal(0),
				echoes: Decimal(0),
				impetus: Decimal(1),
				interval: Decimal(Math.floor(864*Math.pow(PHI, 2))),
				nextIn: Decimal(Math.floor(864*Math.pow(PHI, 2))),
			},
			four: {
				depth: 4,
				isZero: false,
				visibleAt: Decimal((12**4)/2),
				cost: Decimal(12**4),
				power: Decimal((13.0*(12.0**3)+(12.0**2))/(12.0**4)),
				oddsNumerator: Decimal(1),
				oddsDenominator: Decimal(5),
				count: Decimal(0),
				echoes: Decimal(0),
				impetus: Decimal(1),
				interval: Decimal(Math.floor(864*Math.pow(PHI, 3))),
				nextIn: Decimal(Math.floor(864*Math.pow(PHI, 3))),
			},
			five: {
				depth: 5,
				isZero: false,
				visibleAt: Decimal((12**5)/2),
				cost: Decimal(12**5),
				power: Decimal((13.0*(12.0**4)+(12.0**3))/(12.0**5)),
				oddsNumerator: Decimal(1),
				oddsDenominator: Decimal(6),
				count: Decimal(0),
				echoes: Decimal(0),
				impetus: Decimal(1),
				interval: Decimal(Math.floor(864*Math.pow(PHI, 4))),
				nextIn: Decimal(Math.floor(864*Math.pow(PHI, 4))),
			},
			six: {
				depth: 6,
				isZero: false,
				visibleAt: Decimal((12**6)/2),
				cost: Decimal(12**6),
				power: Decimal((13.0*(12.0**5)+(12.0**4))/(12.0**6)),
				oddsNumerator: Decimal(1),
				oddsDenominator: Decimal(7),
				count: Decimal(0),
				echoes: Decimal(0),
				impetus: Decimal(1),
				interval: Decimal(Math.floor(864*Math.pow(PHI, 5))),
				nextIn: Decimal(Math.floor(864*Math.pow(PHI, 5))),
			},
			seven: {
				depth: 7,
				isZero: false,
				visibleAt: Decimal((12**7)/2),
				cost: Decimal(12**7),
				power: Decimal((13.0*(12.0**6)+(12.0**5))/(12.0**7)),
				oddsNumerator: Decimal(1),
				oddsDenominator: Decimal(8),
				count: Decimal(0),
				echoes: Decimal(0),
				impetus: Decimal(1),
				interval: Decimal(Math.floor(864*Math.pow(PHI, 6))),
				nextIn: Decimal(Math.floor(864*Math.pow(PHI, 6))),
			}
		}
	}
}

//---

function loadPlayer() {
	let player;
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
	localStorage.setItem("axiomPlayer", JSON.stringify(save));
	console.log("Saving.");
}

function resetPlayer() {
	localStorage.removeItem("axiomPlayer");
	console.log("Reseting.");
}

function incRed(red) {
    redBatchInc(red.one, red.zero, red.zero)
    redBatchInc(red.two, red.one, red.zero)
    redBatchInc(red.three, red.two, red.zero)
    redBatchInc(red.four, red.three, red.zero)
    redBatchInc(red.five, red.four, red.zero)
    redBatchInc(red.six, red.five, red.zero)
    redBatchInc(red.seven, red.six, red.zero)
}

function redBatchInc(redCurr, redPrev, zero) {
	redCurr.nextIn = redCurr.nextIn.minus(HB)
	if (redCurr.nextIn.lt(0)) {
		let total = redCurr.count.plus(redCurr.echoes)
		var easy = total.times(redCurr.oddsNumerator).idiv(redCurr.oddsDenominator)
		if (redPrev.depth === 0) {
			console.log("Easy nous " + easy.toString())
			redPrev.nous = redPrev.nous.plus(easy.times(redPrev.impetus));
		} else {
			console.log("Easy " + redPrev.depth + " echoes " + easy.toString())
			redPrev.echoes = redPrev.echoes.plus(easy.times(redPrev.impetus));
		}

		var hard = total.minus(easy.times(redCurr.oddsDenominator))
		for (var each = Decimal(0); each.lt(hard); each = each.plus(1)) {
			var odds = +redCurr.oddsNumerator.div(redCurr.oddsDenominator)
			if (Math.random() < odds) {
				zero.streak = 0
				console.log("streak reset")
				if (redPrev.depth === 0) {
					console.log("Hard nous")
					redPrev.nous = redPrev.nous.plus(redPrev.impetus);
				} else {
					console.log("Hard " + redPrev.depth + " echoes")
					redPrev.echoes = redPrev.echoes.plus(redPrev.impetus);
				}
			} else {
				zero.streak += 1;
				console.log("bad-luck streak " + zero.streak)
			}
		}

		redCurr.nextIn = redCurr.nextIn.plus(redCurr.interval)
	}
}

function heartBeat(player) {
	player.mainCounter = player.mainCounter.plus(1);
	incRed(player.red);
	redraw(player)
}

function redZero(zero) {
	zero.nous = zero.nous.plus(zero.impetus);
}

function redBuySuccessor(redSucc, zero) {
    if(zero.nous.gte(redSucc.cost)) {
        redSucc.count = redSucc.count.plus(1);
    	zero.nous = zero.nous.minus(redSucc.cost);
		redSucc.cost = redSucc.cost.pow(redSucc.power).toDecimalPlaces(0, Decimal.ROUND_DOWN);
	};
}

function redraw(player) {
	document.getElementById("redNous").innerHTML = dozenal(player.red.zero.nous);
	drawRed("One", player.red.one, player.red.zero.nous)
	drawRed("Two", player.red.two, player.red.zero.nous)
	drawRed("Three", player.red.three, player.red.zero.nous)
	drawRed("Four", player.red.four, player.red.zero.nous)
	drawRed("Five", player.red.five, player.red.zero.nous)
	drawRed("Six", player.red.six, player.red.zero.nous)
	drawRed("Seven", player.red.seven, player.red.zero.nous)
}

function drawRed(numstr, rednum, nous) {
	document.getElementById("red" + numstr + "Count").innerHTML = dozenal(rednum.count);
	document.getElementById("red" + numstr + "Echoes").innerHTML = dozenal(rednum.echoes);
	document.getElementById("red" + numstr + "Cost").innerHTML = dozenal(rednum.cost);
	document.getElementById("red" + numstr + "OddsNumerator").innerHTML = dozenal(rednum.oddsNumerator);
	document.getElementById("red" + numstr + "OddsDenominator").innerHTML = dozenal(rednum.oddsDenominator);
	document.getElementById("red" + numstr + "Cost").innerHTML = dozenal(rednum.cost);
	document.getElementById("red" + numstr + "Interval").innerHTML = dozenal(rednum.interval);
	document.getElementById("red" + numstr + "NextIn").innerHTML = dozenal(rednum.nextIn);
	if (nous.gte(rednum.visibleAt)) {
		document.getElementById("red" + numstr + "Display").style.display = "block";
	}
}

function dozenal(dec) {
	var bn = BigNumber(dec.toString())
	return bn.toString(12)
}

function buildButtons(player) {
	document.getElementById('redZeroButton').addEventListener('click', function() {
		redZero(player.red.zero)
	})
	document.getElementById('redOneButton').addEventListener('click', function() {
		redBuySuccessor(player.red.one, player.red.zero)
	})
	document.getElementById('redTwoButton').addEventListener('click', function() {
		redBuySuccessor(player.red.two, player.red.zero)
	})
	document.getElementById('redThreeButton').addEventListener('click', function() {
		redBuySuccessor(player.red.three, player.red.zero)
	})
	document.getElementById('redFourButton').addEventListener('click', function() {
		redBuySuccessor(player.red.four, player.red.zero)
	})
	document.getElementById('redOneButton').addEventListener('click', function() {
		redBuySuccessor(player.red.five, player.red.zero)
	})
	document.getElementById('redTwoButton').addEventListener('click', function() {
		redBuySuccessor(player.red.six, player.red.zero)
	})
	document.getElementById('redTwoButton').addEventListener('click', function() {
		redBuySuccessor(player.red.seven, player.red.zero)
	})
}

var player;

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

	buildButtons(player_obj);
	
	setInterval(function() {
		heartBeat(player_obj);
	}, HB);
}

main() // And there was.
// ---


