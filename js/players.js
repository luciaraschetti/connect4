'use strict'

var p1Name = null;
var p2Name = null;
var p3Name = null;
var p3Tag = null;
var btnStart = null;
var btnAdd = null;
var btnAddContainer = null;
var playerNames = [];

var displayInput = function() {
    if(btnAddContainer.className === '' || btnAddContainer.className === 'shift-right') {
        p3Tag.className = 'tag';
        p3Name.className = ' ';
        btnAddContainer.className = 'shift-left';
        btnAdd.className += ' del';
        btnAdd.innerHTML = '-';
    } else {
        p3Tag.className = 'hidden';
        p3Name.className = 'hidden';
        btnAddContainer.className = 'shift-right';
        btnAdd.className = 'btn';
        btnAdd.innerHTML = '+';
    }
}

var validateInput = function() {
    var isValid = true;

    if(p3Name.className === ' ' && p3Name.value.length < 3) {
        p3Name.value = '';
        p3Name.placeholder = 'Too short!';
        isValid = false;
    }

    if(p1Name.value.length < 3) {
        p1Name.value = '';
        p1Name.placeholder = 'Too short!';
        isValid = false;
    }

    if(p2Name.value.length < 3) {
        p2Name.value = '';
        p2Name.placeholder = 'Too short!';
        isValid = false;
    }
    return isValid;
}

var savePlayerNames = function() {
    if(p3Name.value.length > 0 ) {
        playerNames.push({namep1: p1Name.value, namep2: p2Name.value, namep3: p3Name.value});
    } else {
        playerNames.push({namep1: p1Name.value, namep2: p2Name.value});
    }
    localStorage['playersNames'] = JSON.stringify(playerNames);
}

var errorBtn = function() {
    btnStart.innerHTML = 'Invalid Names';
    btnStart.className += ' error';
    setTimeout(erroMsg, 2000);
}

var erroMsg = function() {
    btnStart.className = 'btn';
    btnStart.innerHTML = 'Start Game';
}

var nextPage = function() {
    savePlayerNames();
    var newGame = true;
    localStorage['newGame'] = JSON.stringify(newGame);
    location.href = 'game.html';
}

window.onload = function() {
    p1Name = document.getElementById('p1-name');
    p2Name = document.getElementById('p2-name');
    p3Name = document.getElementById('p3-name');
    p3Tag = document.getElementById('p3-tag');
    btnStart = document.getElementById('start-btn');
    btnAdd = document.getElementById('add-player');
    btnAddContainer = document.getElementById('btn-container');

    btnAdd.addEventListener('click', function() {
        displayInput();
    });
    btnStart.addEventListener('click', function() {
        (validateInput()) ? nextPage() : errorBtn();
    });
}