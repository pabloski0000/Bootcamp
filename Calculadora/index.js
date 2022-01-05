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
let permitidoSumarRestarMultiplicarODividir = true;

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
            if(output_numero_grande.textContent === '0' || !permitidoSumarRestarMultiplicarODividir){
                output_numero_grande.textContent = this.firstElementChild.textContent;
                permitidoSumarRestarMultiplicarODividir = true;
                return;
            }
            output_numero_grande.textContent += this.firstElementChild.textContent;
        }
    }))
})();
(function agregarEventosABotonSuma(){
    boton_suma.addEventListener('click', function(){
        if(permitidoSumarRestarMultiplicarODividir){
            acumuladoOperandosAnteriores += textoANumero(output_numero_grande.textContent);
            output_numero_pequenyo.textContent = ''.concat(acumuladoOperandosAnteriores).concat(' +');
            permitidoSumarRestarMultiplicarODividir = false;
        }
    })
})();
(function agregarEventosABotonResta(){
    boton_resta.addEventListener('click', function(){
        if(permitidoSumarRestarMultiplicarODividir){
            acumuladoOperandosAnteriores -= textoANumero(output_numero_grande.textContent);
            output_numero_pequenyo.textContent = ''.concat(acumuladoOperandosAnteriores).concat(' -');
            permitidoSumarRestarMultiplicarODividir = false;
        }
    })
})();
(function agregarEventosABotonIgual(){
    boton_igual.addEventListener('click', function(){
        acumuladoOperandosAnteriores -= textoANumero(output_numero_grande.textContent);
        output_numero_pequenyo.textContent = ''.concat(acumuladoOperandosAnteriores).concat(' -');
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
