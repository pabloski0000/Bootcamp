import {nifCharacters} from "./nif_characters_depending_on_reminder.js";

let button = document.getElementById('ejer5_button');
let p = document.getElementById('ejer5').getElementsByTagName('p')[0];
let nifRegex = /\d{8}[a-z]/i;

function checkLastLetterNif(nif){
    let numberOfNif = nif.substring(0, 8);
    let reminder = window.parseInt(numberOfNif) % 23;
    return nif[8].toLowerCase() == nifCharacters[reminder].toLowerCase();
}

button.addEventListener('click', () => {
    let nif = window.prompt('Introduce your nif to check if it is correct');
    let isRight = nifRegex.test(nif) && checkLastLetterNif(nif);
    p.innerHTML = 'Resultado: '.concat(isRight);
    console.log(isRight);
})
