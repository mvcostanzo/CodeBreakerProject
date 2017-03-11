let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if !(validateInput(input)){
        return false;
    }
    else{
        attempt+=1;
    }
}

//implement new functions here
function setHiddenFields(){
    answer = Math.floor(Math.random()).toString();
    while (answer.length < 4){
        answer = "0" + answer;
    }
    attempt = 0;
    return answer;
}

function setMessage(message){
    document.getElementById('message').innerHTML = message;
}

function validateInput(guess){
    if (guess.length == 4){
        return true;
    }
    else{
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    }
}

function getResults(input){
    
}