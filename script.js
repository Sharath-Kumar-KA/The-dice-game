"use strict";

//Selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice1");
const diceE2 = document.querySelector(".dice2");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const doneButton = document.querySelector(".done");
const modalh = document.querySelector(".hidden");

let scores, currnetScore, activePlayer, playing;

//Initial Conditions

window.onload = function () {
  modalh.classList.remove("hidden");
};

doneButton.addEventListener("click", function () {
  modalh.classList.add("hidden");
});

const init = function () {
  scores = [0, 0];
  currnetScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  diceE2.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currnetScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    const dice2 = Math.trunc(Math.random() * 6) + 1;
    //2.Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    diceE2.classList.remove("hidden");
    diceE2.src = `dice-${dice2}.png`;
    console.log(dice);
    console.log(dice2);

    //3.Check 4 roll 1:
    if (dice === dice2) {
      switchPlayer();
    } else {
      currnetScore += dice + dice2;
      document.getElementById(`current--${activePlayer}`).textContent =
        currnetScore;
    }
    /*if (dice !== 1) {
      currnetScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currnetScore;
    } */ //if true switch to next player
    //else {
    //switchPlayer();
    //}
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.add current score to active player's score
    scores[activePlayer] += currnetScore; //score[1]+=currentscore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if player's score is>=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      diceE2.classList.add("hidden");
      var name = activePlayer;
      ++name;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
