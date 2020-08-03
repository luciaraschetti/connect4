'use strict'

var gameLI = null;
var btnBack = null;
var btnNext = null;
var savedGamesHTML = null;
var p1HTML = null;
var p2HTML = null;
var dateHTML = null;
var empty = null;
var start = 0;
var end = 5;


//Changes current 'page' by modifying the start & end parameters of the displayed games section
var navigation = function(e) {
    var btn = e.target.id;
    if(btn === 'next') {
        start += 5;
        end += 5;
    } else {
        if(start >= 5) {
            start -= 5;
            end -= 5;
        }
    }
    loadSavedGamesData();
}

//Displays only the first 5 saved games by sectioning an array made from gameLI
//and showing only the <li> that are a part of that section
var loadSavedGamesData = function() {
    var listSection = Array.from(gameLI).slice(start, end);

    for(var i = 0; i < savedGames.length; i++) {
        p1HTML[i].innerHTML = savedGames[i].p1.name;
        p2HTML[i].innerHTML = savedGames[i].p2.name;
        dateHTML[i].innerHTML =  savedGames[i].date;
    }

    for(var l = 0; l < savedGames.length; l++) {
        gameLI[l].className = 'game hidden';
    }

    for(var j = 0; j < savedGames.length; j++) {
        listSection[j].className = ' game';
    }
}

var renderList = function() {
    var storedGames = JSON.parse(localStorage['savedGames']).length;
    var html = '';

    for(var i = 0; i < storedGames; i++) {
        html += '<li tabindex="-1" class="game hidden">';
        html += '<div class="match-container">';
        html += '<div class="game-info p1"></div>';
        html += '<p>VS</p>';
        html += '<div class="game-info p2"></div>';
        html += '</div>';
        html += '<p class="date"></p>';
        html += '</li>';
    }
    savedGamesHTML.innerHTML = html;
    loadSavedGamesData();
}

window.onload = function() {
    savedGames = JSON.parse(localStorage['savedGames']);
    savedGamesHTML = document.getElementById('games');
    gameLI = document.getElementsByClassName('game');
    p1HTML = document.getElementsByClassName('game-info p1');
    p2HTML = document.getElementsByClassName('game-info p2');
    dateHTML = document.getElementsByClassName('date');
    empty = document.getElementById('empty');
    btnBack = document.getElementById('back').addEventListener('click', navigation);
    btnNext =  document.getElementById('next').addEventListener('click', navigation);
    (savedGames.length > 0) ? renderList() : empty.className = '';
}