'use strict';

var submitBtn = null;
var formElements = null;

//opens the operating system's default emailing tool
//fills the subject & body with name and message field values
var sendEmail = function(name, message) {
    window.open('mailto:luciaraschetti11@gmail.com?subject=' + 'C4 Page Contact Form: '
     + encodeURIComponent(name) +'&body=' + encodeURIComponent(message));
}

//checks for empty fields, character count & proper email address. 
//If every field is OK, passes name and message to sendEmail
var validateForm = function() {
    var alphaNum = /^[a-zA-Z0-9]*$/; //alphanumeric characters only
    var validEmail = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/; //regex with multiple email formats
    var name = '';
    var message = '';
    var isValid = true;

    for(var i = 0; i < formElements.length; i++) {
       if(formElements[i].value === '') {
           formElements[i].placeholder = 'Empty field';
           isValid = false;
        } else {
            
            if(formElements[i].id === 'name') {
                if(!alphaNum.test(formElements[i].value)) {
                    formElements[i].value = '';
                    formElements[i].placeholder = 'Invalid characters';
                    isValid = false;
                }

                if(formElements[i].value.length < 3) {
                    formElements[i].value = '';
                    formElements[i].placeholder = 'Please enter more than 3 characters';
                    isValid = false;
                }

                name = formElements[i].value;
            }

            if(formElements[i].id === 'email') {
                if(!validEmail.test(formElements[i].value)) {
                    formElements[i].value = '';
                    formElements[i].placeholder = 'Invalid Email format';
                    isValid = false;
                }
            }

            if(formElements[i].id === 'message') {
                if(formElements[i].value.length < 5) {
                    formElements[i].value = '';
                    formElements[i].placeholder = 'Please enter more than 5 characters';
                    isValid = false;
                }
                
                message = formElements[i].value;
            }   
       }
    }

    (isValid) ? sendEmail(name, message) : styleBtn();
}

var styleBtn = function() {
    submitBtn.innerHTML = 'Unable to send Email';
    submitBtn.className += 'error';
    setTimeout(erroMsg, 2000);
}

var erroMsg = function() {
    submitBtn.className = ' ';
    submitBtn.innerHTML = 'Send Message';
}

window.onload = function() {
    formElements = document.getElementsByClassName('entry');
    submitBtn = document.getElementById('submit');
    submitBtn.onclick = validateForm;
}