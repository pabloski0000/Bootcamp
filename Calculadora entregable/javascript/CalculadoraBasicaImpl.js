export class CalculadoraBasicaImpl{
    constructor(valorActual, acumulado){
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
