'use strict';

// ---- Variables to select different elements -----------------------------//
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// ---- Defining initial status --------------------------------------------//
diceElement.classList.add('hidden');
score0Element.textContent = 0;
score1Element.textContent = 0;
let currentScore = 0;
let activePlayer = 0; //(0 if player 0 and 1 if player 1)
const scores = [0, 0];

// ---- Switching palyers function -----------------------------------------//
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// ---- Defining Roll Dice Button functionality ----------------------------//
const rollDice = function () {
  //Generate random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //Display the dice image according to random number generated
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${dice}.png`;

  //Check if value === 1; if so, game switch to next player.
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
};

btnRoll.addEventListener('click', rollDice);

// ---- Defining Hold Button functionality ----------------------------//

const hold = function () {
  // Add current score to the active's player score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // Check if player's score is above 100 and the player will wins the game; otherwise switch players
  if (scores[activePlayer] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceElement.classList.add('hidden');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
  } else {
    switchPlayer();
    diceElement.classList.add('hidden');
  }
};

btnHold.addEventListener('click', hold);
