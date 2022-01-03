let article = document.getElementById('ejer1');
let p = article.getElementsByTagName('p')[0];

let minNumber = Math.random();
let maxNumber = minNumber + Math.random();

function generateRandomNumber(minNumber, maxNumber){
    return (Math.random() * (maxNumber - minNumber) + minNumber);
}

p.innerHTML = "Resultado: ".concat(generateRandomNumber(1, 10));
