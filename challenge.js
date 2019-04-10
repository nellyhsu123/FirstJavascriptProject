/************
* CHALLENGE
*/


var scores, roundScore, activePlayer, gamePlaying, previousRoll;

init();



document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gameplaying) {
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;
		console.log(previousRoll, dice);

		// 2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';


		// 3. Update the round score IF the rolled number was NOT a 1
		if(previousRoll === 6 && dice === 6) {
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

		previousRoll = dice;
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gameplaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;


		// Update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		//Check if player won the game
		if(scores[activePlayer] >= 20) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
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

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gameplaying = true;
	previousRoll = 0;

	document.querySelector('.dice').style.display = 'none';

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

