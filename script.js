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

// ---- Defining Roll dice functionality -----------------------------------//
const rollDice = function () {
  //Generate random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //Discplay the dice image according to random number generated
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${dice}.png`;

  //Check if value === 1; if so, game switch to next player.
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player--${activePlayer === 1 ? 0 : 1}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
};

btnRoll.addEventListener('click', rollDice);
