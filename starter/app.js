/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declaring var here means I don't need to below
var scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);

//textContent only works with plain text
//We call this a setter because we set the value
document.querySelector('#current-' + activePlayer).textContent = dice;

// <em> in this case needs to be in a string, otherwise it is not JS
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//We call this a getter beceause it gets the value
var x = document.querySelector('#score-0').textContent;
console.log(x);

//Here we are using querySelector to change our CSS properties
//display is the CSS property and 'none' is the value
document.querySelector('.dice').style.display = 'none';