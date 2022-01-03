let button = document.getElementById('ejer6_button');
let p = document.getElementById('ejer6').getElementsByTagName('p')[0];

function isPalindrome(string){
    let formattedString = string.toLowerCase().replaceAll(' ', '');
    for(let i = 0, j = formattedString.length - 1; i <= j; ++i, --j){
        if(formattedString[i] != formattedString[j]){
            return false;
        }
    }
    return true;
}

button.addEventListener('click', () => {
    let string = window.prompt('Introduce a sentence to know if it is a palindrome');
    debugger;
    let stringIsPalindrome = isPalindrome(string);
    p.innerHTML = 'Resultado: '.concat(stringIsPalindrome);
    console.log(stringIsPalindrome);
});
