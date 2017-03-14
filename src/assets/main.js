let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' && attempt.value == ''){
        setHiddenFields();
    }
    console.log('Answer:' + answer.value + ' Attempt: ' + attempt.value);
    if (!validateInput(input.value)){
        return false;
    }
    else{
        attempt.value= parseInt(attempt.value) + 1;
        let result = getResults(input);
        if(result == true){
            setMessage('You Win! :)');
            showAnswer(true);
            showReplay();
        }
        else if (result == false && attempt.value >= 10){
            setMessage('You Lose! :(');
            showAnswer(false);
            showReplay();
        }
        else{
            setMessage('Incorrect, try again.');
        }
    }
}

//implement new functions here
function setHiddenFields(){
    answer.value = Math.floor((Math.random()*10000) + 1).toString();
    while (answer.value.length < 4){
        answer.value = "0" + answer.value;
    }
    attempt.value = 0;
}

function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

function validateInput(guess){
    console.log('Guess:' + guess);
    if (guess.length == 4){
        return true;
    }
    else{
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    }
}

function getResults(input){
    let resultHTML = "<div class='row'><span class='col-md-6'>" + input.value + "</span><div class='col-md-6'>";
    let correctCount = 0;
    for (i=0; i < 4; i++){
        if (input.value[i] == answer.value[i]){
            //Perfect Match - Character and Position
            resultHTML+= '<span class="glyphicon glyphicon-ok"></span>';
            correctCount+=1;
        }
        else if (answer.value.indexOf(input.value[i]) != -1){
            resultHTML+='<span class="glyphicon glyphicon-transfer"></span>';
        }
        else{
            resultHTML+='<span class="glyphicon glyphicon-remove"></span>'
        }
    }
    
    document.getElementById('results').innerHTML += resultHTML + '</div>'
    if (correctCount == 4){
        return true;
    }
    else{
        return false;
    }
}

function showAnswer(wonGame){
    let codeElement = document.getElementById('code');
    codeElement.innerHTML = answer.value;
    if (wonGame == true){
        codeElement.className += ' success';
    }
    else{
        codeElement.className += ' failure';
    }
}

function showReplay(){
    let guessDiv = document.getElementById('guessing-div');
    guessDiv.style.display = 'none';
    let replayDiv = document.getElementById('replay-div');
    replayDiv.style.display = 'block';
}