let scores, roundScore, activePlayer, playingGame, firstPlayerName, secondPlayerName, sixTimesOne, winningScore, winner, playerNames;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {    
    if(playingGame) {
        //1. Getting random number
        let dice0 = Math.floor(Math.random() * 6) + 1;
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice = dice0 + dice1;

        
        //2. Display the result 
        let diceDom0 = document.querySelector('.dice-0');
        diceDom0.style.display = 'block';
        diceDom0.src = 'img/dice-' + dice0 + '.png'

        let diceDom1 = document.querySelector('.dice-1');
        diceDom1.style.display = 'block';
        diceDom1.src = 'img/dice-' + dice1 + '.png'

        // 3. Hiding help button while playing game
        document.getElementById("btn-help").style.display = "none";
        
        if(dice0 == 1 || dice1 == 1){
            roundScore = 0;
            sixTimesOne[activePlayer]++;
            //Showing indicator of one
            document.getElementById("indicator-" + activePlayer).textContent = sixTimesOne[activePlayer];
            document.getElementById("indicator-" + activePlayer).style.display = "block";

            //4 .Checking if one is rolled 6 times
            if(sixTimesOne[activePlayer] == 6){
                scores[activePlayer] = 0;
                updateUi(activePlayer,scores);
                sixTimesOne[activePlayer] = 0;
            }

            nextPlayer();
            document.querySelector('.dice-0').style.display = "block";
            document.querySelector('.dice-1').style.display = "block";
            return;
        } else {
            //5. Update the round score 
            //6. Add score
            roundScore = roundScore + dice; 
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(playingGame){
        //1. Add current score to global score
        scores[activePlayer] += roundScore;
        
        //2. Update the ui
        updateUi(activePlayer, scores);

        //3. Check if player won the game
        if(scores[activePlayer] >= winningScore){
            //Setting winner name 
            winner = "Winner is " + playerNames[activePlayer] + "!";
            document.querySelector('#name-' + activePlayer).textContent = winner;
            document.querySelector('.dice-0').style.display = "none";
            document.querySelector('.dice-1').style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            playingGame = false;
            // 4. Showing the help button
            document.getElementById("btn-help").style.display = "block";
        } else {
            //5. Next player
            nextPlayer();
        }  
    }

})

// Starting new game
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    playingGame = false;
    sixTimesOne = [0,0];
    playerNames = ["",""];


    document.getElementById("indicator-0").style.display = "none";
    document.getElementById("indicator-1").style.display = "none";
    document.querySelector('.dice-0').style.display = "none";
    document.querySelector('.dice-1').style.display = "none";
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.winning-score-display').style.display = "none";
    document.getElementById("btn-help").style.display = "block";
    
    if(firstPlayerName){
        document.getElementById('name-0').textContent = firstPlayerName;
        playerNames[0] = firstPlayerName;
    }
        
    if(secondPlayerName){
        document.getElementById('name-1').textContent = secondPlayerName;
        playerNames[1] = secondPlayerName;
    }

    if(winningScore) {
        document.querySelector('.winning-score-display').style.display = 'block';
    }
    

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    checkInput(checkNames(),checkWinningScore());

    
}



function getInputValue0() {
    //Selecting the name input element and get its value
    firstPlayerName = document.getElementById("name-input-0").value;
    playerNames[0] = firstPlayerName;
    if(firstPlayerName == ""){
        alert("Please enter name!")
    } else {
        document.getElementById("name-0").textContent = firstPlayerName;
        checkInput(checkNames(),checkWinningScore());
    }
}


function getInputValue1() {
    //Selecting the name input element and get its value
    secondPlayerName = document.getElementById("name-input-1").value;
    playerNames[1] = secondPlayerName;
    if(secondPlayerName == ""){
        alert("Please enter name!")
    } else {
        document.getElementById("name-1").textContent = secondPlayerName;
        checkInput(checkNames(),checkWinningScore());
    }
}

function getScoreValue() {
    // Selecting the winning-score input element and get its value 
    let score = document.getElementById('winning-score-id').value;
    winningScore = parseInt(score);
    if(winningScore){
        document.querySelector('.winning-score-display').style.display = 'block';
        document.getElementById('winning-score-display-id').textContent = winningScore;
        document.querySelector('#winning-score-form').style.display = 'none';
        checkInput(checkNames(),checkWinningScore());
    } else {
        alert("Please enter a number!")
    }
}


//Checking if it is correct input 
function checkNames(){
    return (firstPlayerName && secondPlayerName)  
}

//Checking if it is correct input 
function checkWinningScore(){
    return (winningScore)
}

//Checking if it is correct input 
function checkInput(names, score) {
    if(names && score){
        playingGame = true;
    } else {
        playingGame = false;
    }
}

function nextPlayer() {
    //3.2 Next player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        //Resetting roundScore
        roundScore = 0;
        
        document.getElementById("current-0").textContent = "0";
        document.getElementById("current-1").textContent = "0";

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice-0').style.display = "none";
        document.querySelector('.dice-1').style.display = "none";
}


function updateUi(activePlayer, scores) {
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
}

//How to play button
function howToPlay(){
    document.getElementById("info-content").style.zIndex = "2";
    document.getElementById("game-content").style.zIndex = "1";
}

//Back to game button
function onPlay(){
    document.getElementById("game-content").style.zIndex = "2";
    document.getElementById("info-content").style.zIndex = "1";
}


//Preventingdefault input area 
    const input = document.querySelectorAll(".input-area");
    for(let i = 0; i < input.length; i++){
        input[i].addEventListener("submit", function(event){
            event.preventDefault();
        })
    }

