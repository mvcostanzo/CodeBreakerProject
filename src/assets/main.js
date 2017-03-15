/*jslint es6, browser, devel*/
let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

//implement new functions here
function setHiddenFields() {
    "use strict";
    answer.value = Math.floor((Math.random() * 10000) + 1).toString();
    while (answer.value.length < 4) {
        answer.value = "0" + answer.value;
    }
    attempt.value = 0;
}

function setMessage(message) {
    "use strict";
    document.getElementById('message').innerHTML = message;
}

function validateInput(guess) {
    "use strict";
    console.log('Guess:' + guess);
    if (guess.length === 4) {
        return true;
    } else {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    }
}

function getResults(inputEntry) {
    "use strict";
    let resultHTML = "<div class='row'><span class='col-md-6'>" + inputEntry.value + "</span><div class='col-md-6'>";
    let i;
    let inputEntryStringArray = inputEntry.value;
    for (i = 0; i < inputEntryStringArray.length; i += 1) {
        if (inputEntry.value[i] === answer.value[i]) {
            //Perfect Match - Character and Position
            resultHTML += '<span class="glyphicon glyphicon-ok"></span>';
        } else if (answer.value.indexOf(inputEntry.value[i]) > -1) {
            resultHTML += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            resultHTML += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    document.getElementById('results').innerHTML += resultHTML + '</div></div>';
    if (inputEntry.value === answer.value) {
        return true;
    }
    return false;
}

function showAnswer(wonGame) {
    "use strict";
    let codeElement = document.getElementById('code');
    codeElement.innerHTML = answer.value;
    if (wonGame === true) {
        codeElement.className += ' success';
    } else {
        codeElement.className += ' failure';
    }
}

function showReplay() {
    "use strict";
    let guessDiv = document.getElementById('guessing-div');
    guessDiv.style.display = 'none';
    let replayDiv = document.getElementById('replay-div');
    replayDiv.style.display = 'block';
}

function guess() {
    "use strict";
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' && attempt.value === '') {
        setHiddenFields();
    }
    console.log('Answer:' + answer.value + ' Attempt: ' + attempt.value);
    let inputValid = validateInput(input.value);
    if (inputValid === false) {
        return false;
    }
    if (inputValid === true) {
        attempt.value = parseInt(attempt.value) + 1;
        let result = getResults(input);
        if (result === true) {
            setMessage('You Win! :)');
            showAnswer(true);
            showReplay();
        } else if (result === false && attempt.value >= 10) {
            setMessage('You Lose! :(');
            showAnswer(false);
            showReplay();
        } else {
            setMessage('Incorrect, try again.');
        }
    }
}