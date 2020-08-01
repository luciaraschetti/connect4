'use strict'

var p1Name = null;
var p2Name = null;
var boardHTML = null;
var columnsHTML = null;

var board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

var getPlayerNames = function() {
    var savedNames = JSON.parse(localStorage['playersNames']);
    p1Name.innerHTML = savedNames[0].namep1 + ' (P1)';
    p2Name.innerHTML = savedNames[0].namep2 + ' (P2)';
}

var columnEventHandler = function(evt) {
    var columnId = evt.target.id.substr(1, 1);
    for(var i = 0; i < board[columnId].length; i++) {
        if(!board[columnId][i]) {
            renderBoard();
            break;
        }
    }
}

var bindColumnHandlers = function() {
    columnsHTML = document.getElementsByClassName('column');
    for(var i = 0; i < columnsHTML.length; i++) {
        columnsHTML[i].onclick = columnEventHandler;
    }
}

var renderBoard = function() {
    var html = '';
    for(var i = 0; i < board.length; i++) {
        html += '<div id="c' + i + '" class="column">';
        for(var j = board[i].length - 1; j >= 0; j--) {
            html += '<div id="s' + i + j + '" class="slot';
            if(board[i][j]) {html += ' ' + board[i][j];}
            html += '"></div>';
        }
        html += '</div>';
    }
    boardHTML.innerHTML = html;
    bindColumnHandlers();
}

window.onload = function() {
    p1Name = document.getElementById('p1-name');
    p2Name = document.getElementById('p2-name');
    columnsHTML = document.getElementsByClassName('column');
    boardHTML = document.getElementById('play-area');
    getPlayerNames();
    renderBoard();
}