'use strict'

var p1Name = null;
var p2Name = null;
var p3Name = null;
var p3Tag = null;
var btnAdd = null;
var btnAddContainer = null;

window.onload = function() {
    p1Name = document.getElementById('p1-name');
    p2Name = document.getElementById('p2-name');
    p3Name = document.getElementById('p3-name');
    p3Tag = document.getElementById('p3-tag');
    btnAdd = document.getElementById('add-player');
    btnAddContainer = document.getElementById('btn-container')
    btnAdd.addEventListener('click', function() {
        p3Tag.className = 'tag';
        p3Name.className = ' ';
        btnAddContainer.className += ' shift-left';
        btnAdd.className += ' del';
        btnAdd.innerHTML = '-';
    });
}