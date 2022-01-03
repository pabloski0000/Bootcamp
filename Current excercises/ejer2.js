let button = document.getElementById('ejer2_button');
let randomNumber = window.parseInt(Math.random() * 100 + 1);
let attempt = 1;
console.log(randomNumber);
function userSimpleMessageFeedBack(number){
    if(number != randomNumber){
        return number > randomNumber ? "Introduce a lower number" : "Introduce a bigger number";
    }
    return "They're equals";
}

function checkIfNumberOfAttemptsIsLowerThanEleven(numberOfAttempt){
    return numberOfAttempt < 11;
}

button.addEventListener('click', () => {
    if(checkIfNumberOfAttemptsIsLowerThanEleven(attempt)){
        let chosenNumber = window.prompt("Introduce the number you think it is");
        console.log(userSimpleMessageFeedBack(chosenNumber));
        ++attempt;
    }else{
        console.log('You exceeded the 10 attempts you had. Restart the page to continue playing');
    }
});
