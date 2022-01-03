import { primeNumbers } from "./1000_first_prime_numbers_array.js";

let p = document.getElementById('ejer4').getElementsByTagName('p')[0];
let button = document.getElementById('ejer4_button');

function returnPrimeNumbers(numberOfPrimeNumbers){
    return primeNumbers.slice(0, numberOfPrimeNumbers);
}

button.addEventListener('click', () => {
    let numberOfPrimeNumbers = window.prompt('Introduce the number of prime numbers you want to visualize. Maximum = 1000');
    p.innerHTML = 'Resultado: '.concat(returnPrimeNumbers(numberOfPrimeNumbers));
})
