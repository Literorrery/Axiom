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

BigNumber.config({ ALPHABET: '0123456789DE', EXPONENTIAL_AT: 4, DECIMAL_PLACES: 4 })

const saveLink = document.querySelector('.saveLink');
const loadLink = document.querySelector('.loadLink');
const resetLink = document.querySelector('.resetLink');
const HB = 1000/30;
const BIXBY_CONSTANT = 12; // Display base. Inside the code, everything's base-10 for programmer safety.
const REN_CYCLE = 900; // 2*2*3*3*5*5, also the base pulse speed
const CRESSIDA_LIMIT = 23; // Number of red successor layers possible; 24th successor would take more than 1.8e308 nous.
const ROQUE_CONSTANT = Decimal(Number.MAX_VALUE) // Value above which successors cannot coalesce; the boundary of the real.
const PHI = (1 + Math.sqrt(5))/2 // The Golden Mean. This will come up a lot.
const VERSION = "0.0.2"

// If you need more, build them from here: https://dozenal.fandom.com/wiki/Systematic_Dozenal_Nomenclature
// Bizenty, Trizenty, Quazenty, Quinzenty, Hexenty, Sebzenty, Oxenty, Enzenty, Dexenty, Levazenty, (10^1)
// one to lev Gross (10^2)
// zen to Levazenty-lev Gross (10^3)
// one to lev Myriad (10^4)
// zen to lavezenty-lev myriad (10^5)
// one to lev Gross myriad (10^6)
// zen to lavezenty-lev gross myriad (10^7)
// one to lev myllion (10^8)

const ORDINALS = [
	"Cero",
	"En",
	"Dey",
	"Tri",
	"Tess",
	"Ped",
	"Hex",
	"Seb",
	"Ox",
	"Nea",
	"Dex",
	"Lev",
	"Zen",
	"Enzeen",
	"Deyzeen",
	"Trizeen",
	"Tesseen",
	"Pedzeen",
	"Hexeen",
	"Sebzeen",
	"Oxeen",
	"Neazeen",
	"Dexeen",
	"Levazeen",
	"Deyzenty",
];

const CARDINALS = [
	"Ceroth",
	"Ennest",
	"Deyeth",
	"Tirth",
	"Tesseth",
	"Pedeth",
	"Hexeth",
	"Sebeth",
	"Oxeth",
	"Neath",
	"Dexeth",
	"Lefeth",
	"Zeneth",
	"Enzeenth",
	"Deyzeenth",
	"Trizeenth",
	"Tesseenth",
	"Pedzeenth",
	"Hexeenth",
	"Sebzeenth",
	"Oxeenth",
	"Neazeenth",
	"Dexeenth",
	"Levazeenth",
	"Deyzentieth",
];

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
	for (var j = 1; j <= num; j++) {
		i = i + j;
	}
	return i;
}

function lazyCaterer(num) {
	return triangle(num)+1;
}

function buildRedZero(rawZero) {
	return {
		depth: rawZero.depth,
		nous: Decimal(rawZero.nous),
		impetus: Decimal(rawZero.impetus),
		streak: rawZero.streak,
		ordinal: rawZero.ordinal,
		cardinal: rawZero.cardinal
	}
}

function buildRedSucc(rawSucc) {
	return {
		depth: rawSucc.depth,
		ordinal: ORDINALS[rawSucc.depth],
		cardinal: CARDINALS[rawSucc.depth],
		visibleAt: Decimal(rawSucc.visibleAt),
		cost: Decimal(rawSucc.cost),
		power: Decimal(rawSucc.power),
		oddsNumerator: Decimal(rawSucc.oddsNumerator),
		oddsDenominator: Decimal(rawSucc.oddsDenominator),
		count: Decimal(rawSucc.count),
		echoes: Decimal(rawSucc.echoes),
		impetus: Decimal(rawSucc.impetus),
		interval: Decimal(rawSucc.interval),
		nextIn: Decimal(rawSucc.nextIn),
	}
}

function newPlayer() {
	let rs = [
		buildRedZero({
			depth: 0,
			nous: 0,
			impetus: 1,
			streak: 0,
			ordinal: ORDINALS[0],
			cardinal: CARDINALS[0]
		})
	]
	for (var i = 1; i <= CRESSIDA_LIMIT; i++) {
		rs.push(buildRedSucc({
			depth: i,
			ordinal: ORDINALS[i],
			cardinal: CARDINALS[i],
			visibleAt: (BIXBY_CONSTANT**lazyCaterer(i-1))/2,
			cost: BIXBY_CONSTANT**lazyCaterer(i-1),
			power: ((BIXBY_CONSTANT+1)*(BIXBY_CONSTANT**(i-1))+(i===1?0:BIXBY_CONSTANT**(i-2)))/(BIXBY_CONSTANT**i),
			oddsNumerator: 1,
			oddsDenominator: i+1,
			count: 0,
			echoes: 0,
			impetus: 1,
			interval: Math.floor(REN_CYCLE*Math.pow(PHI, i-1)),
			nextIn: Math.floor(REN_CYCLE*Math.pow(PHI, i-1)),
		}))
	}
	return {
		version: "0.0.1",
		jacket: "red",
		mainCounter: Decimal(0),
		red: {
			succ: rs,
		}
	}
}

//---

function loadRed(rawRed) {
	let rs = [
		buildRedZero({
			depth: rawRed.succ[0].depth,
			nous: rawRed.succ[0].nous,
			impetus: rawRed.succ[0].impetus,
			streak: rawRed.succ[0].streak,
			ordinal: ORDINALS[0],
			cardinal: CARDINALS[0]
		})
	]
	for (var i = 1; i <= CRESSIDA_LIMIT; i++) {
		rs.push(buildRedSucc({
			depth: rawRed.succ[i].depth,
			ordinal: ORDINALS[i],
			cardinal: CARDINALS[i],
			visibleAt: rawRed.succ[i].visibleAt,
			cost: rawRed.succ[i].cost,
			power: rawRed.succ[i].power,
			oddsNumerator: rawRed.succ[i].oddsNumerator,
			oddsDenominator: rawRed.succ[i].oddsDenominator,
			count: rawRed.succ[i].count,
			echoes: rawRed.succ[i].echoes,
			impetus: rawRed.succ[i].impetus,
			interval: rawRed.succ[i].interval,
			nextIn: rawRed.succ[i].nextIn,
		}))
	}
	return {
		succ: rs,
	}
}

function loadPlayer() {
	let player;
	if (localStorage.getItem("axiomPlayer")) {
		let rawPlayer = JSON.parse(localStorage.getItem("axiomPlayer"));
		player = {
			oldVersion: rawPlayer.version,
			version: VERSION,
			jacket: rawPlayer.jacket,
			mainCounter: Decimal(rawPlayer.mainCounter),
			red: loadRed(rawPlayer.red)
		}

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
	for (var i = 0; i < (red.succ.length-1); i++) {
		redBatchInc(red.succ[i+1], red.succ[i], red.succ[0])
	}
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
	document.getElementById("redNous").innerHTML = dozenal(player.red.succ[0].nous);
	drawRed("One", player.red.succ[1], player.red.succ[0].nous)
	drawRed("Two", player.red.succ[2], player.red.succ[0].nous)
	drawRed("Three", player.red.succ[3], player.red.succ[0].nous)
	drawRed("Four", player.red.succ[4], player.red.succ[0].nous)
	drawRed("Five", player.red.succ[5], player.red.succ[0].nous)
	drawRed("Six", player.red.succ[6], player.red.succ[0].nous)
	drawRed("Seven", player.red.succ[7], player.red.succ[0].nous)
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
	var rounded = dec.toDecimalPlaces(0)
	var outstr = rounded.toString(12)
	var size = rounded.sd(true)
	if (size > 6) {
		var dozparts = [...outstr];
		return `${dozparts[0]}:${dozparts[1]}${dozparts[2]}${dozparts[3]}${dozparts[4]}...∘10↑${size}`
	}

	return outstr
}

function buildButtons(player) {
	document.getElementById('redZeroButton').addEventListener('click', function() {
		redZero(player.red.succ[0])
	})
	document.getElementById('redOneButton').addEventListener('click', function() {
		redBuySuccessor(player.red.succ[1], player.red.succ[0])
	})
	document.getElementById('redTwoButton').addEventListener('click', function() {
		redBuySuccessor(player.red.succ[2], player.red.succ[0])
	})
	document.getElementById('redThreeButton').addEventListener('click', function() {
		redBuySuccessor(player.red.succ[3], player.red.succ[0])
	})
	document.getElementById('redFourButton').addEventListener('click', function() {
		redBuySuccessor(player.red.succ[4], player.red.succ[0])
	})
	document.getElementById('redFiveButton').addEventListener('click', function() {
		redBuySuccessor(player.red.succ[5], player.red.succ[0])
	})
	document.getElementById('redSixButton').addEventListener('click', function() {
		redBuySuccessor(player.red.succ[6], player.red.succ[0])
	})
	document.getElementById('redSevenButton').addEventListener('click', function() {
		redBuySuccessor(player.red.succ[7], player.red.succ[0])
	})
}

function main() {  // Let there be.
	var player_obj = loadPlayer();
	loadLink.addEventListener('click', function() {
		player_obj = loadPlayer();
		buildButtons(player_obj);
	});
	saveLink.addEventListener('click', function() {
		savePlayer(player_obj);
	});
	resetLink.addEventListener('click', function() {
		resetPlayer();
		player_obj = newPlayer();
		window.location.reload();
	});

	buildButtons(player_obj);
	
	setInterval(function() {
		heartBeat(player_obj);
	}, HB);
}

main() // And there was.
// ---


