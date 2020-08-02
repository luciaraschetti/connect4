'use strict'

var p1 = null;
var p2 = null;
var p1Name = null;
var p2Name = null;
var p1Timer = null;
var p2Timer = null;
var globalTimer = null;
var boardHTML = null;
var columnsHTML = null;
var turnHTML = null;
var turnHTMLText = null;
var p1TimerHTML = null;
var p2TimerHTML = null;
var globalTimerHTML = null;
var popup = null;
var popupMessage = null;
var popupWinner = null;
var resetBtn = null;
var board = null;
var turn = null;
var lastUpdatedTime = new Date().getTime();
var gameOver = false;

var twoPlayerBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

var resetGame = function() {
    gameOver = false;
    popup.className = 'hidden';
    boardHTML.className = '';
    board.resetBoard();
    board.render();
    resetTimers();
    setTimeout(toggleTurn, 1);
}

var resetTimers = function() {
    globalTimer.resetTimer();
    p1Timer.resetTimer();
    p2Timer.resetTimer();
}

var stopTimers = function() {
    globalTimer.stopTimer();
    p1Timer.stopTimer();
    p2Timer.stopTimer();
}

var displayPopup = function(playerName) {
    gameOver = true;
    boardHTML.className = 'disabled';
    popup.className = ' ';
    if(playerName) {
        playerName = (playerName === 'p1') ? p1.name : p2.name;
        popupWinner.innerHTML = playerName;
        popupMessage.innerHTML = 'WINS';
    } else {
        popupWinner.innerHTML = 'Nobody wins...';
        popupMessage.innerHTML = 'It\'s a TIE!';
    }
    stopTimers();
}

//checks the 4 possible scenarios for a win
var checkWin = function() {
    //check vertical placement
    for(var i = 0; i < board.board.length; i++) {
        for(var j = 0; j < 4; j++) {
            if(board.board[i][j]) {
                if(board.board[i][j] === (board.board[i][j + 1]) && board.board[i][j] === (board.board[i][j + 2]) && 
                board.board[i][j] === (board.board[i][j + 3])) {
                    displayPopup(board.board[i][j]);
                }
            }
        }
    }

    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(board.board[i][j]) {
                //check horizontal placement
                if(board.board[i][j] === (board.board[i + 1][j]) && board.board[i][j] === (board.board[i + 2][j]) && 
                board.board[i][j] === (board.board[i + 3][j])) {
                    displayPopup(board.board[i][j]);
                }
                //check diagonal increment placement
                if(board.board[i][j] === (board.board[i + 1][j + 1]) && board.board[i][j] === (board.board[i + 2][j + 2]) && 
                board.board[i][j] === (board.board[i + 3][j + 3])) {
                    displayPopup(board.board[i][j]);
                }
            }
        }
    }
    //check diagonal decrement placement
    for (var i = 0; i < board.board.length - 3; i++) {
        for (var j = 3; j < board.board[i].length; j++) {
            if (board.board[i][j]) {
                if (board.board[i][j] === (board.board[i + 1][j - 1]) && board.board[i][j] === (board.board[i + 2][j - 2]) && 
                board.board[i][j] === (board.board[i + 3][j - 3]) ) {
                    displayPopup(board.board[i][j]);
                }
            }
        }
    }
}

//checks if board is full for a draw
var checkDraw =  function() {
    for(var i = 0; i < board.board.length; i++) {
        if(board.board[i].includes(null)) {
            var isFull = false
            return;
        } else {
            isFull = true;
        }
    }
    if(isFull) {
        displayPopup(null);
    }
}

var getPlayerNames = function() {
    var savedNames = JSON.parse(localStorage['playersNames']);
    p1Name.innerHTML = savedNames[0].namep1 + ' (P1)';
    p2Name.innerHTML = savedNames[0].namep2 + ' (P2)';
}

var flipTurn = function() {
    if(turn === 'p1') {
        turnHTML.className = 'switch-p1 slot p1';
        turnHTMLText.className = 'switch-p1';
        turnHTMLText.innerHTML = 'P1';
    } else {
        turnHTML.className = 'switch-p2 slot p2';
        turnHTMLText.className = 'switch-p2';
        turnHTMLText.innerHTML = 'P2';
    }
}

var toggleTurn = function() {
    if(!gameOver) {
        turn = (turn === 'p1') ? 'p2' : 'p1';
        if(turn === 'p1') {
            p2Timer.stopTimer();
            p1Timer.startTimer();
        } else {
            p1Timer.stopTimer();
            p2Timer.startTimer();
        }
        flipTurn();
    }
}

window.onload = function() {
    p1Name = document.getElementById('p1-name');
    p2Name = document.getElementById('p2-name');
    p1TimerHTML = document.getElementById('p1-time');
    p2TimerHTML = document.getElementById('p2-time');
    globalTimerHTML = document.getElementById('time');
    columnsHTML = document.getElementsByClassName('column');
    boardHTML = document.getElementById('play-area');
    turnHTML = document.getElementById('turn');
    turnHTMLText = document.getElementById('turn-text');
    popup = document.getElementById('popup');
    popupMessage = document.getElementById('message');
    popupWinner = document.getElementById('winner');
    document.getElementById('reset').addEventListener('click', resetGame);
    getPlayerNames();
    p1 = new Player(p1Name.innerHTML.slice(0, -5));
    p2 = new Player(p2Name.innerHTML.slice(0, -5));
    p1Timer = new Timer(p1TimerHTML, 0, lastUpdatedTime, 0);
    p2Timer = new Timer(p2TimerHTML, 0, lastUpdatedTime, 0);
    globalTimer = new Timer(globalTimerHTML, 0, lastUpdatedTime, 0); 
    globalTimer.startTimer();
    turn = Math.random() > 0.5 ? 'p1' : 'p2';
    toggleTurn();
    board = new Board(boardHTML, columnsHTML, twoPlayerBoard);
    board.render();
    flipTurn();
}