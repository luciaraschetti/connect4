'use strict'

var gameLI = null;
var savedGamesHTML = null;
var p1HTML = null;
var p2HTML = null;
var dateHTML = null;

var loadSavedGamesData = function() {
    savedGames = JSON.parse(localStorage['savedGames']);

    for(var i = 0; i < savedGames.length; i++) {
        p1HTML[i].innerHTML = savedGames[i].p1.name;
        p2HTML[i].innerHTML = savedGames[i].p2.name;
        dateHTML[i].innerHTML =  savedGames[i].date;
    }
}

var renderList = function() {
    var storedGames = JSON.parse(localStorage['savedGames']).length;
    var html = '';

    for(var i = 0; i < storedGames; i++) {
        html += '<li tabindex="-1" class="game">';
        html += '<div class="match-container">';
        html += '<div class="game-info p1"></div>';
        html += '<p>VS</p>';
        html += '<div class="game-info p2"></div>';
        html += '</div>';
        html += '<p class="date"></p>';
        html += '</li>';
    }
    savedGamesHTML.innerHTML = html;
}

window.onload = function() {
    savedGamesHTML = document.getElementById('games');
    gameLI = document.getElementsByClassName('game');
    p1HTML = document.getElementsByClassName('game-info p1');
    p2HTML = document.getElementsByClassName('game-info p2');
    dateHTML = document.getElementsByClassName('date');
    renderList();
    loadSavedGamesData();
}