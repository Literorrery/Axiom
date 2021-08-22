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

const saveLink = document.querySelector('.saveLink');
const loadLink = document.querySelector('.loadLink');
const resetLink = document.querySelector('.resetLink');
const HB = 33;
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
		"Twenty-Seventh",
		"Twenty-Eighth"
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
		mainCounter: 0,
		red: {
			zero: {
				nous: 0,
				impetus: 1,
			},
			one: {
				visibleAt: (12**1)/2,
				cost: 12**1,
				power: (13.0*(12.0**0)+0)/(12.0**1),
				oddsNumerator: 1,
				oddsDenominator: 1,
				count: 0,
				echoes: 0,
				impetus: 1,
				interval: 1000,
				nextIn: 1000,
			},
			two: {
				visibleAt: (12**2)/2,
				cost: 12**2,
				power: (13.0*(12.0**1)+(12.0**0))/(12.0**2),
				oddsNumerator: 1,
				oddsDenominator: 2,
				count: 0,
				echoes: 0,
				impetus: 1,
				interval: Math.floor(1000*PHI),
				nextIn: Math.floor(1000*PHI),
			},
			three: {
				visibleAt: (12**3)/2,
				cost: 12**3,
				power: (13.0*(12.0**2)+(12.0**1))/(12.0**3),
				oddsNumerator: 1,
				oddsDenominator: 3,
				count: 0,
				echoes: 0,
				impetus: 1,
				interval: Math.floor(1000*PHI*PHI),
				nextIn: Math.floor(1000*PHI*PHI),
			}
		}
	}
}

//---

function loadPlayer() {
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

function incRed(red) {
    let one = red.one
	one.nextIn = one.nextIn - HB
	if (one.nextIn < 0) {
		let oneTotal = one.count + one.echoes
		red.zero.nous = red.zero.nous + (oneTotal * one.impetus)
		one.nextIn = one.nextIn + one.interval
	}

    redBatchInc(red.two, red.one)
    redBatchInc(red.three, red.two)
}

function redBatchInc(redCurr, redPrev) {
	redCurr.nextIn = redCurr.nextIn - HB
	if (redCurr.nextIn < 0) {
		let total = redCurr.count + redCurr.echoes
		var b = getBaseLog(12, total / 2);
		var batchCount = Math.floor(b);
		while (batchCount > 0) {
			var batchSize = Math.floor(total / (2 * batchCount));
			for (var eachBatch = 0; eachBatch < batchCount; eachBatch++) {
				if (Math.random() < ((redCurr.oddsNumerator * 1.0) / redCurr.oddsDenominator)) {
					redPrev.echoes += batchSize;
				}
				total -= batchSize;
			}
			b = getBaseLog(12, total / 2);
			batchCount = Math.floor(b);
		}
		for (eachBatch = 0; eachBatch < total; eachBatch++) {
			if (Math.random() < ((redCurr.oddsNumerator * 1.0) / redCurr.oddsDenominator)) {
				redPrev.echoes++;
			}
		}
		redCurr.nextIn = redCurr.nextIn + redCurr.interval
	}
}

function heartBeat(player) {
	player.mainCounter++;
	incRed(player.red);
	redraw(player)
}

function redZero() {
	player.red.zero.nous += player.red.zero.impetus;
}

function redBuySuccessor(redSucc, nous) {
    if(nous >= redSucc.cost){
        redSucc.count = redSucc.count + 1;
    	nous = nous - redSucc.cost;
		redSucc.cost = Math.floor(Math.pow(redSucc.cost, redSucc.power));
	};
}

function redOne(){
	redBuySuccessor(player.red.one, player.red.zero.nous)
}    

function redTwo(){
	redBuySuccessor(player.red.two, player.red.zero.nous)
}    

function redThree(){
	redBuySuccessor(player.red.three, player.red.zero.nous)
}    

function redraw(player) {
	document.getElementById("redNous").innerHTML = player.red.zero.nous;

	document.getElementById("redOneCount").innerHTML = player.red.one.count;
	document.getElementById("redOneEchoes").innerHTML = player.red.one.echoes;
	document.getElementById("redOneCost").innerHTML = player.red.one.cost;
	document.getElementById("redOneInterval").innerHTML = player.red.one.nextIn;
	if (player.red.zero.nous >= player.red.one.visibleAt) {
		document.getElementById("redOneDisplay").style.display = "block";
	}

	document.getElementById("redTwoCount").innerHTML = player.red.two.count;
	document.getElementById("redTwoEchoes").innerHTML = player.red.two.echoes;
	document.getElementById("redTwoCost").innerHTML = player.red.two.cost;
	document.getElementById("redTwoInterval").innerHTML = player.red.two.nextIn;
	if (player.red.zero.nous >= player.red.two.visibleAt) {
		document.getElementById("redTwoDisplay").style.display = "block";
	}

	document.getElementById("redThreeCount").innerHTML = player.red.three.count;
	document.getElementById("redThreeEchoes").innerHTML = player.red.three.echoes;
	document.getElementById("redThreeCost").innerHTML = player.red.three.cost;
	document.getElementById("redThreeInterval").innerHTML = player.red.three.nextIn;
	if (player.red.zero.nous >= player.red.three.visibleAt) {
		document.getElementById("redThreeDisplay").style.display = "block";
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
	
	setInterval(function() {
		heartBeat(player_obj);
	}, HB);
}

main() // And there was.
// ---


