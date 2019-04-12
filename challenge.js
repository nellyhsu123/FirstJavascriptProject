/************
* CHALLENGE
*/


var scores, roundScore, activePlayer, gamePlaying, previousRoll;

init();



document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gameplaying) {
		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//querySelector only selects first appearance of it's element

		// 2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


		if(dice1 !== 1 && dice2 !== 1) {
			//add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}

		// 3. Update the round score IF the rolled number was NOT a 1
		/*if(previousRoll === 6 && dice === 6) {
			scores[activePlayer] = 0;
			document.getElementById('score-' + activePlayer).textContent = '0';
			//next player
			nextPlayer();
		} else if(dice !== 1) {
			//add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}

		previousRoll = dice;*/
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gameplaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;


		// Update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score').value;
		var winningScore;

		// Undefined, 0, nul or "" are COERCED to false
		// Anything else is COERCED to true
		if(input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		//Check if player won the game
		if(scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			//rather than writing tons of code in javascript to manipulate css, 
			//make a style class in css in which you can add and remove
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gameplaying = false;
		} else {
			nextPlayer();
		}
	}

	
});

//DRY = don't repeat yourself function
function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;


	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//document.querySelector('.player-0-panel').classList.remove('active');
	//document.querySelector('.player-1-panel').classList.add('active');

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gameplaying = true;
	previousRoll = 0;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +'</>';

//var x = document.querySelector('#score-0').textContent;