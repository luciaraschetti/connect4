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
var saveBtn = null;
var board = null;
var turn = null;
var lastUpdatedTime = new Date().getTime();
var savedGames = [];
var savedTimers = [];
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
    popup.className = ' ';
    if(playerName) {
        playerName = (playerName === 'p1') ? p1.name : p2.name;
        popupWinner.innerHTML = playerName;
        popupMessage.innerHTML = 'WINS';
    } else {
        popupWinner.innerHTML = 'Nobody wins...';
        popupMessage.innerHTML = 'It\'s a TIE!';
    }
    boardHTML.className = ' disabled blur'
    stopTimers();
}

var getDate = function() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

var saveGame = function() {
    savedGames.push({currentBoard: board.board, p1: p1, p2: p2, turn: turn, date: getDate()});
    savedTimers.push({p1: p1Timer, p2: p2Timer, globalTime: globalTimer});
    localStorage['savedGames'] = JSON.stringify(savedGames);
    localStorage['savedTimers'] = JSON.stringify(savedTimers);
    console.log('Game: Saved');
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

var loadSavedGame = function() {
    var savedGameIndex = JSON.parse(localStorage['gameIndex']);
    savedGames = JSON.parse(localStorage['savedGames']);
    savedTimers = JSON.parse(localStorage['savedTimers']);
    
    board.board = savedGames[savedGameIndex].currentBoard;
    turn = savedGames[savedGameIndex].turn;
    p1 = savedGames[savedGameIndex].p1;
    p2 = savedGames[savedGameIndex].p2;

    p1Timer.currentTimer = savedTimers[savedGameIndex].p1.currentTimer;
    p1Timer.lastUpdatedTime = savedTimers[savedGameIndex].p1.lastUpdatedTime;

    p2Timer.currentTimer = savedTimers[savedGameIndex].p2.currentTimer;
    p2Timer.lastUpdatedTime = savedTimers[savedGameIndex].p2.lastUpdatedTime;

    globalTimer.currentTimer = savedTimers[savedGameIndex].globalTime.currentTimer;
    globalTimer.lastUpdatedTime = savedTimers[savedGameIndex].globalTime.lastUpdatedTime;

    board.render();
    globalTimer.startTimer();
    p1Timer.startTimer();
    p2Timer.startTimer();
    setTimeout(toggleTurn, 1);
}

var initialize = function() {
    var isNewGame = JSON.parse(localStorage['newGame']);
    board = new Board(boardHTML, columnsHTML, twoPlayerBoard);
    p1 = new Player('Player 1');
    p2 = new Player('Player 2');
    p1Timer = new Timer(p1TimerHTML, 0, lastUpdatedTime, 0);
    p2Timer = new Timer(p2TimerHTML, 0, lastUpdatedTime, 0);
    globalTimer = new Timer(globalTimerHTML, 0, lastUpdatedTime, 0); 

    if(isNewGame) {
        getPlayerNames();
        p1 = new Player(p1Name.innerHTML.slice(0, -5));
        p2 = new Player(p2Name.innerHTML.slice(0, -5));
        turn = Math.random() > 0.5 ? 'p1' : 'p2';
        globalTimer.startTimer();
        toggleTurn();
        board.render();
        flipTurn();
        
    } else {
        loadSavedGame();
    }
}

window.onload = function() {
    //data persistence
    savedGames = JSON.parse(localStorage['savedGames'] || '[]');
    savedTimers = JSON.parse(localStorage['savedTimers'] || '[]');

    if(window.location.href.indexOf('game.html') > -1) {
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
        document.getElementById('save').addEventListener('click', saveGame);
        initialize();
    }
}