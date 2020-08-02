'use strict'

var p1Name = null;
var p2Name = null;
var boardHTML = null;
var columnsHTML = null;
var turnHTML = null;
var turnHTMLText = null;
var board = null;
var turn = null;

var twoPlayerBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

//checks the 4 possible scenarios for a win or if the board is full for a draw
var checkGameStatus = function() {
    //check vertical placement
    for(var i = 0; i < board.board.length; i++) {
        for(var j = 0; j < 4; j++) {
            if(board.board[i][j]) {
                if(board.board[i][j] === (board.board[i][j + 1]) && board.board[i][j] === (board.board[i][j + 2]) && 
                board.board[i][j] === (board.board[i][j + 3])) {
                    console.log('game over vertical ' + board.board[i][j]);
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
                    console.log('game over horizontal ' + board.board[i][j]);
                }
                //check diagonal increment placement
                if(board.board[i][j] === (board.board[i + 1][j + 1]) && board.board[i][j] === (board.board[i + 2][j + 2]) && 
                board.board[i][j] === (board.board[i + 3][j + 3])) {
                    console.log('game over diagonal inc ' + board.board[i][j]);
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
                    console.log('game over diagonal dec ' + board.board[i][j]);
                }
            }
        }
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
    turn = (turn === 'p1') ? 'p2' : 'p1';
    flipTurn();
    console.log(turn);
}

window.onload = function() {
    p1Name = document.getElementById('p1-name');
    p2Name = document.getElementById('p2-name');
    columnsHTML = document.getElementsByClassName('column');
    boardHTML = document.getElementById('play-area');
    turnHTML = document.getElementById('turn');
    turnHTMLText = document.getElementById('turn-text');
    getPlayerNames();
    turn = Math.random() > 0.5 ? 'p1' : 'p2';
    board = new Board(boardHTML, columnsHTML, twoPlayerBoard);
    board.render();
    flipTurn();
}