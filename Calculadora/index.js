const ELEMENTOS_DENTRO_DE_CALCULADORA = document.querySelector('#calculadora').children;
let acumuladoOperandosAnteriores = 0;
let operando2;
let boton_ce;
let boton_c;
let boton_borrar_numero;
let boton_division;
let boton_multiplicacion;
let boton_resta;
let boton_suma;
let boton_igual;
let output_numero_grande;
let output_numero_pequenyo;
const BOTONES_OPERANDO = [];
let limpiar = false;

for(let elemento of ELEMENTOS_DENTRO_DE_CALCULADORA){
    if(elemento.className.includes('boton_operando')){
        BOTONES_OPERANDO.push(elemento);
    }
    switch(elemento.id){
        case 'boton_ce':
            boton_ce = elemento;
            break;
        case 'boton_c':
            boton_c = elemento;
            break;
        case 'boton_borrar_numero':
            boton_borrar_numero = elemento;
            break;
        case 'boton_division':
            boton_division = elemento;
            break;
        case 'boton_multiplicacion':
            boton_multiplicacion = elemento;
            break;
        case 'boton_resta':
            boton_resta = elemento;
            break;
        case 'boton_suma':
            boton_suma = elemento;
            break;
        case 'boton_igual':
            boton_igual = elemento;
            break;
        case 'output_numero_grande':
            output_numero_grande = elemento;
            break;
        case 'output_numero_pequenyo':
            output_numero_pequenyo = elemento;
            break;
    }
}

(function agregarEventosABotonesOperando(){
    BOTONES_OPERANDO.forEach(elemento => elemento.addEventListener('click', function(){
        if(output_numero_grande.textContent.length < 9){
            if(output_numero_grande.textContent === '0' || limpiar){
                output_numero_grande.textContent = this.firstElementChild.textContent;
                limpiar = false;
                return;
            }
            output_numero_grande.textContent += this.firstElementChild.textContent;
        }
    }))
})();
(function agregarEventosABotonSuma(){
    boton_suma.addEventListener('click', function(){
        if(!limpiar){
            acumuladoOperandosAnteriores += textoANumero(output_numero_grande.textContent);
            output_numero_grande.textContent = ''.concat(acumuladoOperandosAnteriores);
            output_numero_pequenyo.textContent = ''.concat(acumuladoOperandosAnteriores).concat(' +');
            limpiar = true;
        }
        output_numero_pequenyo.textContent = ''.concat(acumuladoOperandosAnteriores).concat(' +');
    })
})();
(function agregarEventosABotonResta(){
    boton_resta.addEventListener('click', function(){
        if(limpiar){
            acumuladoOperandosAnteriores -= textoANumero(output_numero_grande.textContent);
            output_numero_pequenyo.textContent = ''.concat(acumuladoOperandosAnteriores).concat(' -');
            output_numero_grande.textContent = ''.concat(acumuladoOperandosAnteriores);
            limpiar = false;
        }
    })
})();
(function agregarEventosABotonIgual(){
    boton_igual.addEventListener('click', function(){
        let resumenOperacion;
        let primerOperando = acumuladoOperandosAnteriores;
        let segundoOperando = textoANumero(output_numero_grande.textContent);
        if(output_numero_pequenyo.textContent.includes('+')){
            acumuladoOperandosAnteriores += segundoOperando;
            resumenOperacion = ''.concat(primerOperando).concat(' + ').concat(segundoOperando).concat(' =');
        }else if(output_numero_pequenyo.textContent.includes('-')){
            acumuladoOperandosAnteriores -= segundoOperando;
            resumenOperacion = ''.concat(primerOperando).concat(' - ').concat(segundoOperando).concat(' =');
        }else if(output_numero_pequenyo.textContent.includes('X')){
            acumuladoOperandosAnteriores *= segundoOperando;
            resumenOperacion = ''.concat(primerOperando).concat(' X ').concat(segundoOperando).concat(' =');
        }else if(output_numero_pequenyo.textContent.includes('/')){
            acumuladoOperandosAnteriores /= segundoOperando;
            resumenOperacion = ''.concat(primerOperando).concat(' / ').concat(segundoOperando).concat(' =');
        }else{
            acumuladoOperandosAnteriores = segundoOperando;
            resumenOperacion = '= ';
        }
        output_numero_pequenyo.textContent = resumenOperacion;
        output_numero_grande.textContent = ''.concat(acumuladoOperandosAnteriores);
        limpiar = true;
    })
})();
function textoANumero(texto){
    if(!(typeof texto === 'string')){
        throw new Error('El parámetro texto debe ser del tipo string');
    }
    if(texto.includes(',')){
        texto.replace(',', '.')
    }
    if(texto.includes('.')){
        return window.parseFloat(texto);
    }
    return window.parseInt(texto);
}
function division(){
    return acumuladoOperandosAnteriores / operando2;
}
function multiplication(){
    return acumuladoOperandosAnteriores * operando2;
}
