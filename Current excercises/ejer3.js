let p = document.getElementById('ejer3').getElementsByTagName('p')[0];
let button = document.getElementById('ejer3_button');

function returnArrayOfGivenLength(length, elementsOfArray){
    return elementsOfArray.slice(0, length);
}

button.addEventListener('click', () => {
    let arrayOfIntegers = window.prompt('Introduce the length of the array and the elements you want it to contain. Separate them by commas').split(',');
    let elementsOfNewArray = arrayOfIntegers.slice(1);
    let newArray = returnArrayOfGivenLength(arrayOfIntegers[0], elementsOfNewArray);
    p.innerHTML = "Resultado: ".concat(newArray);
    console.log(newArray);
});
