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
        if(getResults(input) == true){
            setMessage('You Win! :)');
        }
        else{
            if (attempt.value >= 10){
                setMessage('You Lose! :()');
            }
            else{
                setMessage('Incorrect, try again');
            }
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
    for (i=0; i < input.value.length; i++){
       if(answer.value.indexOf(input.value[i]) == i){
           resultHTML+= '<span class="glyphicon glyphicon-ok"></span>';
           correctCount+=1;
       }
        else if(answer.value.indexOf(input.value[i]) != -1){
            console.log(input.value[i] + ' - ' + answer.value.indexOf(input.value[i]))
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