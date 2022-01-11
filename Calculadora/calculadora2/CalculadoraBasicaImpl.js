import {CalculadoraBasica} from './CalculadoraBasica.js';
import { customMixin } from './MixinsWithCommas.js';

export class CalculadoraBasicaImpl extends customMixin(class {})(CalculadoraBasica){
    constructor(valorActual, acumulado){
        super();
        this.valorActual = valorActual;
        this.acumulado = acumulado;
    }
    suma(){
        this.acumulado += this.valorActual;
    }
    resta(){
        this.acumulado -= this.valorActual;
    }
    divide(){
        this.acumulado /= this.valorActual;
    }
    multiplica(){
        this.acumulado *= this.valorActual;
    }
}
