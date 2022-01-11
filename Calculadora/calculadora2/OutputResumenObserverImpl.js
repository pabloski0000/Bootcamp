import { OutputResumenObserver } from "./OutputResumenObserver";

class OutputResumenObserverImpl extends customMixin(class {})(OutputResumenObserver){
    static #singleton;
    static #llamadaDesdeEstaClase;
    constructor(){
        if(!this.#llamadaDesdeEstaClase){
            throw new Error('A esta clase no se le debería hacer new desde fuera. Utiliza su factory o el método getInstance()');
        }
        this.botonResumen = document.querySelector('#output_numero_pequenyo');
        #iniciarEventos();
    }
    static getInstance(){
        if(!this.#singleton){
            this.#llamadaDesdeEstaClase = true;
            this.#singleton = new OutputResumenObserverImpl();
            this.#llamadaDesdeEstaClase = false;
        }
        return this.#singleton;
    }
    #iniciarEventos(){

    }
    setResumen(texto){
        if(typeof texto !== 'string'){
            throw new Error('El parámetro texto debe ser de tipo string');
        }
        this.botonResumen.textContent = texto;
    }
}
