
const game = () => {
	let pScore = 0;
	let cScore = 0;

	// start game/match
	const startMatch = () => {
		const intro = document.querySelector(".intro");
		const playBtn = document.querySelector(".intro button");
		const match = document.querySelector(".match");

		playBtn.addEventListener('click', () => {
			intro.classList.add('fadeOut');
			match.classList.add('fadeIn');
		})
		
	}

	const playMatch = () => {
		const options = document.querySelectorAll('.options button');
		const playerHand = document.querySelector('.player-hand');
		const computerHand = document.querySelector('.computer-hand');

		const hands = document.querySelectorAll('.hands img');
		hands.forEach( (hand) => {
			hand.addEventListener("animationend", function() {
				this.style.animation = "";
			})
		})

		let computerOptions = ['rock', 'paper', 'scissors'];

		options.forEach( (option) => {
			option.addEventListener('click', function(){

				//Computer Choice
				var computerNumbers = Math.floor(Math.random() * 3);
				const computerChoice = computerOptions[computerNumbers];
				
				// Player Choice
				/*There's alumatcally called {this} keyword. So we
				don't need to add playerChoice. Because {this.textContent} keyword refers to option.value.*/
				const playerChoice = option.value;

				setTimeout(() => {

					// Appear Winner
					checkWinner(playerChoice, computerChoice);

					// Update images
					playerHand.src = `./assets/${playerChoice}.png`;
					computerHand.src = `./assets/${computerChoice}.png`;

					if (pScore == 5 || cScore == 5) {

						if (pScore > cScore) {
							var newText = "You won the game !";							
						} else {
							var newText = "Computer won the game !";							
						}

						pScore = 0;
						cScore = 0;

						restartMatch(newText, pScore, cScore);
					}

				}, 2000)

				// Animation
				playerHand.style.animation = "shakePlayer 2s ease";
				computerHand.style.animation = "shakeComputer 2s ease";

			})
		})

	}

	const restartMatch = (newText, pScore, cScore) => {
		
		const intro = document.querySelector(".intro");
		const playBtn = document.querySelector(".intro button");
		const match = document.querySelector(".match");

		intro.classList.remove('fadeOut');
		match.classList.remove('fadeIn');


		const playerScore = document.querySelector('.player-score p');
		const comScore = document.querySelector('.computer-score p');
		playerScore.textContent = pScore;
		comScore.textContent = cScore;

		const newh1 = document.querySelector(".intro h1");
		newh1.textContent = newText;

		playBtn.textContent = "Play again";
		
		playBtn.addEventListener('click', function(){
			intro.classList.add('fadeOut');
			match.classList.add('fadeIn');

			var winner = document.querySelector('.winner');
			winner.textContent = "Choose an option";

			const playHand = document.querySelector('.player-hand');
			const comHand = document.querySelector('.computer-hand');
			playHand.src = `./assets/rock.png`;
			comHand.src = `./assets/rock.png`;

		})

	}

	const updateScore = () => {
		const playerScore = document.querySelector('.player-score p');
		const comScore = document.querySelector('.computer-score p');
		playerScore.textContent = pScore;
		comScore.textContent = cScore;
	}

	const checkWinner = (computerChoice, playerChoice) => {
		var winner = document.querySelector('.winner');

		if (computerChoice === playerChoice) {
			winner.textContent = 'It\'s a tie !';
			pScore++;
			updateScore();
			return;
		}

		if (playerChoice === 'rock') {
			if (computerChoice === 'scissors') {
				winner.textContent = 'You win !';
				pScore++;
				updateScore();
				return;
			} else {
				winner.textContent = 'Computer wins !';
				cScore++;
				updateScore();
				return;
			}
		}

		if(playerChoice === 'paper') {
			if (computerChoice === 'scissors') {
				winner.textContent = 'Computer wins !';
				cScore++;
				updateScore();
				return;
			} else {
				winner.textContent = 'You win !';
				pScore++;
				updateScore();
				return;
			}
		}

		if (playerChoice === 'scissors') {
			if (computerChoice === 'rock') {
				winner.textContent = 'Computer wins !';
				cScore++;
				updateScore();
				return;
			} else {
				winner.textContent = 'You win !';
				pScore++;
				updateScore();
				return;
			}
		}
	}

	// call all inner functions of the game
	startMatch();
	playMatch();

}

// start game
game();

