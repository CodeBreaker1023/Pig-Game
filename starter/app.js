/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declaring var here means I don't need to below
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastRoll;

//Here we are using querySelector to change our CSS properties
//display is the CSS property and 'none' is the value
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

//1. The first argument for the Event Listner is the type of event ('click')
//2. The second argument is the function we want to call when the event happens
       //There are two types of functions we can use here: 1) call back 2)anonymous
       //Call back function - a function called by another function; or a function we pass through another function as an argument. 
       //*This is used when we want to use the function again outside of the EventListener
       //Anonymous function - a function that doesn't have a name, i.e. function(), and is only used for one particular use
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Clear score if two 6s are rolled in a row or update the round score IF rolled number is not 1
        if (dice === 6 && lastRoll ===6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1) {
            //add score
            roundScore += dice; //i.e. roundScore = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }

        lastRoll = dice;
    }
    
});




document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 20) {
            //Announce winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            //Remove di
            document.querySelector('.dice').style.display = 'none';
            //Highlight winner after winning
            document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        } else {
        //Next player
        nextPlayer();
        }
    }
    
});


function nextPlayer() {
    //next player
    //Ternary operator is a shorthand if/else statement; ?=then :=else
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //This resets the round and global score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Changes the active class which activates the gray background behind the current player
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    //Use toggle to switch between players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    

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
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
}


// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

//textContent only works with plain text
//We call this a setter because we set the value
// document.querySelector('#current-' + activePlayer).textContent = dice;

// <em> in this case needs to be in a string, otherwise it is not JS
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//We call this a getter beceause it gets the value
// var x = document.querySelector('#score-0').textContent;
// console.log(x);

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player loses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/