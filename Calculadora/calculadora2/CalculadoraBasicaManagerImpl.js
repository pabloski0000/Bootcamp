import {CalculadoraBasica} from './CalculadoraBasica.js';
import {CalculadoraBasicaImpl} from './CalculadoraBasicaImpl.js';
import {CalculadoraObserver} from './CalculadoraObserver.js';
import {CalculadoraObserverImpl} from './CalculadoraObserverImpl.js';
import {CalculadoraBasicaManager} from './CalculadoraBasicaManager.js';
import { customMixin } from './MixinsWithCommas.js';

export class CalculadoraBasicaManagerImpl extends customMixin(class {})(CalculadoraBasicaManager){
    static #singleton;
    static #llamadaDesdeEstaClase = false;
    static #MODO = {
        NORMAL: 'normal',
        OPERADOR_BASICO: 'operador_basico',
        IGUAL: 'igual'
    }
    #operacionARealizar = { 
        operar: undefined,
        modo: CalculadoraBasicaManagerImpl.#MODO.NORMAL,
        signoOperador: undefined,
        acabaDeClickarIgual: false
    };
    #longitudMaximaNumero;
    constructor(){
        super();
        if(!CalculadoraBasicaManagerImpl.#llamadaDesdeEstaClase){
            throw new Error('A esta clase no se le debería hacer new desde fuera. Utiliza su factory o el método getInstance()');
        }
        this.calculadoraBasica = new CalculadoraBasicaImpl(0, 0);
        this.calculadoraObserver = CalculadoraObserverImpl.getInstance();
        this.#longitudMaximaNumero = 8;
        this.#iniciarDependencias();
    }
    #iniciarDependencias(){
        this.calculadoraObserver.setCalculadoraBasicaManager(this);
    }
    insertarElemento(elemento){
        this.#encontrarElemento(elemento);
    }
    #encontrarElemento(elemento){
        if(elemento.className.includes('boton_operando')){
            if(this.#filtroNumeroPulsado(elemento)){
                this.#anyadirNumero(elemento);
                this.#feedbackAnyadirNumeroInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_borrar_numero'){
            if(this.#filtroBorrarNumero(elemento)){
                this.#borrarNumeroCalculadora();
                this.#feedbackBorrarNumeroInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_ce'){
            if(this.#filtroBorrarValorActual(elemento)){
                this.#borrarValorActualCalculadora();
                this.#feedbackBorrarValorActualInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_c'){
            if(this.#filtroLimpiarCalculadora(elemento)){
                this.#limpiarCalculadora();
                this.#feedbackLimpiarCalculadoraInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_multiplicacion'){
            if(this.#filtroMultiplicar(elemento)){
                this.#prepararMultiplicacion();
                this.#feedbackPrepararMultiplicacionInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_division'){
            if(this.#filtroDividir(elemento)){
                this.#prepararDivision();
                this.#feedbackPrepararDivisionInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_resta'){
            if(this.#filtroResta(elemento)){
                this.#prepararResta();
                this.#feedbackPrepararRestaInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_suma'){
            if(this.#filtroSuma(elemento)){
                this.#prepararSuma();
                this.#feedbackPrepararSumaInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_igual'){
            if(this.#filtroIgual(elemento)){
                let estadoCalculadoraAntesDeOperar = this.#prepararIgual();
                this.#feedbackIgualInterfazGrafica(estadoCalculadoraAntesDeOperar);
            }
        }
        if(elemento.id === 'boton_mas_menos'){
            if(this.#filtroMasMenos(elemento)){
                this.#cambiarSigno();
                this.#feedbackCambiarSignoInterfazGrafica();
            }
        }
        if(elemento.id === 'boton_decimal'){
            if(this.#filtroDecimal(elemento)){
                this.#prepararDecimal();
                this.#feedbackPrepararDecimalInterfazGrafica();
            }
        }
        switch(elemento.id){
            case 'output_numero_grande':
                output_numero_grande = elemento;
                break;
            case 'output_numero_pequenyo':
                output_numero_pequenyo = elemento;
                break;
        }
    }
    #filtroNumeroPulsado(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        if(this.calculadoraObserver.outputNumeroPrincipal.textContent.length >= 8){
            console.warn('Se ha pulsado un número con el que se excedía el tamaño máximo de 8 dígitos del número principal');
            return false;
        }
        return true;
    }
    #filtroBorrarNumero(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            if(!this.calculadoraBasica.acumulado){
                console.warn('No se puede borrar un número cuando el valor actual es undefined o igual a cero');
                return false;
            }
            if(this.calculadoraBasica.acumulado === Infinity || this.calculadoraBasica.acumulado === -Infinity){
                console.warn('No se puede borrar un número cuando el valor es Infinity o -Infinity');
                return false;
            }
            if(this.calculadoraBasica.acumulado === NaN){
                console.warn('No se puede borrar un número cuando el valor es Not a Number(NaN)');
                return false;
            }
        }else{
            if(!this.calculadoraBasica.valorActual){
                console.warn('No se puede borrar un número cuando el valor actual es undefined o igual a cero');
                return false;
            }
            if(this.calculadoraBasica.valorActual === Infinity || this.calculadoraBasica.valorActual === -Infinity){
                console.warn('No se puede borrar un número cuando el valor es Infinity o -Infinity');
                return false;
            }
            if(this.calculadoraBasica.valorActual === NaN){
                console.warn('No se puede borrar un número cuando el valor es Not a Number(NaN)');
                return false;
            }
        }
        return true;
    }
    #filtroBorrarValorActual(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        return true;
    }
    #filtroLimpiarCalculadora(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        return true;
    }
    #filtroMultiplicar(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        if(this.calculadoraBasica.valorActual === NaN){
            console.warn('No se puede multiplicar cuando el valor actual es NaN(Not a Number)');
            return false;
        }
        return true;
    }
    #filtroDividir(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        if(this.calculadoraBasica.valorActual === NaN){
            console.warn('No se puede dividir cuando el valor actual es NaN(Not a Number)');
            return false;
        }
        return true;
    }
    #filtroResta(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        if(this.calculadoraBasica.valorActual === NaN){
            console.warn('No se puede restar cuando el valor actual es NaN(Not a Number)');
            return false;
        }
        return true;
    }
    #filtroSuma(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        if(this.calculadoraBasica.valorActual === NaN){
            console.warn('No se puede sumar cuando el valor actual es NaN(Not a Number)');
            return false;
        }
        return true;
    }
    #filtroIgual(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        return true;
    }
    #filtroMasMenos(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        return true;
    }
    #filtroDecimal(elemento){
        this.#esInstanciaHTMLButtonElementOrThrowError(elemento);
        if(this.calculadoraObserver.outputNumeroPrincipal.textContent.includes('.') || this.calculadoraObserver.outputNumeroPrincipal.textContent.includes(',')){
            console.log('No se puede añadir el signo decimal a un número que ya es decimal');
            return false;
        }
        return true;
    }
    #anyadirNumero(elemento){
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.NORMAL){
            this.#anyadirNumeroModoNormal(elemento);
        }else if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.OPERADOR_BASICO){
            this.#anyadirNumeroModoOperadorBasico(elemento);
        }else if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            this.#anyadirNumeroModoIgual(elemento);
        }
    }
    #borrarNumeroCalculadora(){
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.OPERADOR_BASICO){
            return;
        }
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            if(this.#operacionARealizar.acabaDeClickarIgual){
                this.#setTextoOutputResumen('');
            }else{
                let acumuladoString = this.calculadoraBasica.acumulado.toString();
                let nuevoAcumuladoString = acumuladoString.slice(0, acumuladoString.length - 1);
                if(nuevoAcumuladoString === ''){
                    nuevoAcumuladoString = '0';
                }
                this.#stringAAcumuladoCalculadora(nuevoAcumuladoString);
            }
            return;
        }
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.NORMAL){
            let valorActualString = this.calculadoraBasica.valorActual.toString();
            let nuevoValorActualString = valorActualString.slice(0, valorActualString.length - 1);
            if(nuevoValorActualString === ''){
                nuevoValorActualString = '0';
            }
            this.#stringAValorActualCalculadora(nuevoValorActualString);
            return;
        }
    }
    #borrarValorActualCalculadora(){
        this.calculadoraBasica.valorActual = 0;
    }
    #limpiarCalculadora(){
        this.calculadoraBasica.valorActual = 0;
        this.calculadoraBasica.acumulado = 0;
        this.#operacionARealizar.operar = undefined;
        this.#operacionARealizar.modo = CalculadoraBasicaManagerImpl.#MODO.NORMAL;
    }
    #prepararMultiplicacion(){
        this.#realizarLogicaOperadorBasico();
        this.#operacionARealizar.signoOperador = 'X';
        this.#operacionARealizar.operar = this.calculadoraBasica.multiplica.bind(this.calculadoraBasica);
    }
    #prepararDivision(){
        this.#realizarLogicaOperadorBasico();
        this.#operacionARealizar.signoOperador = '/';
        this.#operacionARealizar.operar = this.calculadoraBasica.divide.bind(this.calculadoraBasica);
        
    }
    #prepararResta(){
        this.#realizarLogicaOperadorBasico();
        this.#operacionARealizar.signoOperador = '-';
        this.#operacionARealizar.operar = this.calculadoraBasica.resta.bind(this.calculadoraBasica);
    }
    #prepararSuma(){
        this.#realizarLogicaOperadorBasico();
        this.#operacionARealizar.signoOperador = '+';
        this.#operacionARealizar.operar = this.calculadoraBasica.suma.bind(this.calculadoraBasica);
    }
    #prepararIgual(){
        console.log(this.calculadoraBasica.valorActual)
        let estadoCalculadoraAntesDeOperar = {
            acumulado: this.calculadoraBasica.acumulado
        }
        if(this.#operacionARealizar.operar){
            this.#operacionARealizar.operar();
        }else{
            this.calculadoraBasica.acumulado = this.calculadoraBasica.valorActual;
        }
        this.#operacionARealizar.modo = CalculadoraBasicaManagerImpl.#MODO.IGUAL;
        this.#operacionARealizar.acabaDeClickarIgual = true; 
        return estadoCalculadoraAntesDeOperar;
    }
    #cambiarSigno(){
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            this.calculadoraBasica.acumulado = -this.calculadoraBasica.acumulado;
        }else{
            this.calculadoraBasica.valorActual = -this.calculadoraBasica.valorActual;
        }
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.OPERADOR_BASICO){
            this.#operacionARealizar.modo = CalculadoraBasicaManagerImpl.#MODO.NORMAL;
        }
    }
    #prepararDecimal(){
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.OPERADOR_BASICO){
            this.#operacionARealizar.modo = CalculadoraBasicaManagerImpl.#MODO.NORMAL;
        }
    }
    #feedbackAnyadirNumeroInterfazGrafica(){
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            this.#setTextoOutputPrincipal(this.#decimalConPuntoADecimalConSignoElegidoSiDecimal(this.calculadoraBasica.acumulado.toString()));
            this.#setTextoOutputResumen('');
            return;
        }
        this.#setTextoOutputPrincipal(this.#decimalConPuntoADecimalConSignoElegidoSiDecimal(this.calculadoraBasica.valorActual.toString()));
    }
    #feedbackBorrarNumeroInterfazGrafica(){
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            this.#setTextoOutputPrincipal(this.calculadoraBasica.acumulado);
            return;
        }
        this.#setTextoOutputPrincipal(this.calculadoraBasica.valorActual.toString());
    }
    #feedbackBorrarValorActualInterfazGrafica(){
        this.#setTextoOutputPrincipal(this.calculadoraBasica.valorActual);
    }
    #feedbackLimpiarCalculadoraInterfazGrafica(){
        this.#setTextoOutputPrincipal(this.calculadoraBasica.valorActual.toString());
        this.#setTextoOutputResumen(this.calculadoraBasica.acumulado ? this.calculadoraBasica.acumulado.toString() : '');
    }
    #feedbackPrepararMultiplicacionInterfazGrafica(){
        this.#setTextoOutputPrincipal(this.calculadoraBasica.acumulado.toString());
        this.#setTextoOutputResumen(this.calculadoraBasica.acumulado.toString().concat(' X '));
    }
    #feedbackPrepararDivisionInterfazGrafica(){
        this.#setTextoOutputPrincipal(this.calculadoraBasica.acumulado.toString());
        this.#setTextoOutputResumen(this.calculadoraBasica.acumulado.toString().concat(' / '));
    }
    #feedbackPrepararRestaInterfazGrafica(){
        this.#setTextoOutputPrincipal(this.calculadoraBasica.acumulado.toString());
        this.#setTextoOutputResumen(this.calculadoraBasica.acumulado.toString().concat(' - '));
    }
    #feedbackPrepararSumaInterfazGrafica(){
        this.#setTextoOutputPrincipal(this.calculadoraBasica.acumulado.toString());
        this.#setTextoOutputResumen(this.calculadoraBasica.acumulado.toString().concat(' + '));
    }
    #feedbackIgualInterfazGrafica(estadoCalculadoraAntesDeOperar){
        const numeroAcumuladoAnterior = estadoCalculadoraAntesDeOperar.acumulado === undefined ?
            '' :
            estadoCalculadoraAntesDeOperar.acumulado.toString();
        const operador = this.#operacionARealizar.signoOperador ? this.#operacionARealizar.signoOperador : '';
        const numeroActual = this.calculadoraBasica.valorActual.toString();
        this.#setTextoOutputPrincipal(this.calculadoraBasica.acumulado.toString());
        this.#setTextoOutputResumen(numeroAcumuladoAnterior
            .concat(' ')
            .concat(operador)
            .concat(' ')
            .concat(numeroActual)
            .concat(' =')
            );
    }
    #feedbackCambiarSignoInterfazGrafica(){
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            this.#setTextoOutputPrincipal(this.calculadoraBasica.acumulado.toString());
        }else{
            this.#setTextoOutputPrincipal(this.calculadoraBasica.valorActual.toString());
        }
    }
    #feedbackPrepararDecimalInterfazGrafica(){
        if(this.#operacionARealizar.modo === CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            this.#setTextoOutputPrincipal(this.calculadoraBasica.acumulado.toString().concat(this.calculadoraObserver.children[0].textContent));
        }else{
            console.log([...this.calculadoraObserver.botonDecimal.children])
            let elementoDecimal = this.#obtenerSignoDecimal();
            this.#setTextoOutputPrincipal(this.calculadoraBasica.valorActual.toString().concat(elementoDecimal));
        }
    }
    #setTextoOutputPrincipal(texto){
        if(this.#comprobarLengthNumero(texto)){
            this.calculadoraObserver.outputNumeroPrincipal.textContent = texto;
        }
    }
    #setTextoOutputResumen(texto){
        this.calculadoraObserver.outputResumen.textContent = texto;
    }
    #stringAValorActualCalculadora(string){
        if(!(typeof string === 'string')){
            throw new Error('El parámetro string debe ser de tipo string');
        }
        if(string.includes('.')){
            this.calculadoraBasica.valorActual = window.parseFloat(string);
        }else{
            this.calculadoraBasica.valorActual = window.parseInt(string);
        }
    }
    #stringAAcumuladoCalculadora(string){
        if(!(typeof string === 'string')){
            throw new Error('El parámetro string debe ser de tipo string');
        }
        if(string.includes('.')){
            this.calculadoraBasica.acumulado = window.parseFloat(string);
        }else{
            this.calculadoraBasica.acumulado = window.parseInt(string);
        }
    }
    #esInstanciaHTMLButtonElementOrThrowError(elemento){
        if(!(elemento instanceof HTMLButtonElement)){
            throw new Error('El elemento pasado por parámetro debería ser o contener al tipo HTMLButtonElement')
        }
    }
    #realizarLogicaOperadorBasico(){
        if(this.#operacionARealizar.modo !== CalculadoraBasicaManagerImpl.#MODO.OPERADOR_BASICO && this.#operacionARealizar.modo !== CalculadoraBasicaManagerImpl.#MODO.IGUAL){
            if(this.#operacionARealizar.operar){
                this.#operacionARealizar.operar();
            }else{
                this.calculadoraBasica.acumulado = this.calculadoraBasica.valorActual;
            }
            this.calculadoraBasica.valorActual = this.calculadoraBasica.acumulado;
        }
        this.#operacionARealizar.modo = CalculadoraBasicaManagerImpl.#MODO.OPERADOR_BASICO;
    }
    #anyadirNumeroModoNormal(elemento){
        let numeroClickado = elemento.children[0].textContent;
        let valorActualString = this.calculadoraBasica.valorActual.toString();
        let nuevoValorActualString = valorActualString.concat(this.#anyadirPuntoSiDecimal(numeroClickado.toString()));
        this.#stringAValorActualCalculadora(nuevoValorActualString);
    }
    #anyadirNumeroModoOperadorBasico(elemento){
        let numeroClickado = elemento.children[0].textContent;
        this.#stringAValorActualCalculadora(numeroClickado);
        this.#operacionARealizar.modo = CalculadoraBasicaManagerImpl.#MODO.NORMAL;
    }
    #anyadirNumeroModoIgual(elemento){
        let numeroClickado = elemento.children[0].textContent;
        let nuevoAcumulado;
        if(this.#operacionARealizar.acabaDeClickarIgual){
            this.#operacionARealizar.acabaDeClickarIgual = false;
        }else{
            let acumuladoActual = this.calculadoraBasica.acumulado.toString();
            acumuladoActual = acumuladoActual;
            nuevoAcumulado = acumuladoActual.concat(this.#anyadirPuntoSiDecimal(numeroClickado.toString()));
        }
        this.#stringAAcumuladoCalculadora(nuevoAcumulado || numeroClickado);
    }
    #comprobarLengthNumero(numeroString){
        if(numeroString.length > this.#longitudMaximaNumero){
            console.error('Desbordamiento. Se ha excedido el número máximo de dígitos');
            this.#limpiarCalculadora();
            this.#setTextoOutputResumen('Desbordamiento. Demasiados dígitos');
            return false;
        }
        return true;
    }
    #anyadirPuntoSiDecimal(numeroString){
        if(this.calculadoraObserver.outputNumeroPrincipal.textContent.endsWith(this.#obtenerSignoDecimal())){
            return '.'.concat(numeroString);
        }
        return numeroString;
    }
    #obtenerSignoDecimal(){
        let elemento;
        for(let e of [...this.calculadoraObserver.botonDecimal.children]){
            if(!e.hidden){
                elemento = e;
            }
        }
        return elemento.textContent;
    }
    #decimalConPuntoADecimalConSignoElegidoSiDecimal(numeroString){
        if(numeroString.includes('.')){
            return numeroString.replace('.', this.#obtenerSignoDecimal());
        }
        return numeroString;
    }
    static getInstance(){
        if(!CalculadoraBasicaManagerImpl.#singleton){
            CalculadoraBasicaManagerImpl.#llamadaDesdeEstaClase = true;
            CalculadoraBasicaManagerImpl.#singleton = new CalculadoraBasicaManagerImpl();
            CalculadoraBasicaManagerImpl.#llamadaDesdeEstaClase = false;
        }
        return CalculadoraBasicaManagerImpl.#singleton;
    }
}
