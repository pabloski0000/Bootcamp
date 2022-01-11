import {CalculadoraObserver} from './CalculadoraObserver.js';
import {CalculadoraBasicaManager} from './CalculadoraBasicaManager.js';
import {CalculadoraBasicaManagerImpl} from './CalculadoraBasicaManagerImpl.js';
import { customMixin } from './MixinsWithCommas.js';

export class CalculadoraObserverImpl extends customMixin(class {})(CalculadoraObserver){
    static #singleton;
    static #llamadaDesdeEstaClase = false;
    constructor(){
        super();
        if(!CalculadoraObserverImpl.#llamadaDesdeEstaClase){
            throw new Error('A esta clase no se le debería hacer new desde fuera. Utiliza su factory o el método getInstance()');
        }
        this.calculadoraBasicaManager;
        this.botonesNumeros = document.querySelectorAll('.boton_operando');
        this.botonMasMenos = document.querySelector('#boton_mas_menos');
        this.botonDecimal = document.querySelector('#boton_decimal');
        this.botonCe = document.querySelector('#boton_ce');
        this.botonC = document.querySelector('#boton_c');
        this.botonBorrarNumero = document.querySelector('#boton_borrar_numero');
        this.botonDivision = document.querySelector('#boton_division');
        this.botonMultiplicacion = document.querySelector('#boton_multiplicacion');
        this.botonResta = document.querySelector('#boton_resta');
        this.botonSuma = document.querySelector('#boton_suma');
        this.botonIgual = document.querySelector('#boton_igual');
        this.outputResumen = document.querySelector('#output_numero_pequenyo');
        this.outputNumeroPrincipal = document.querySelector('#output_numero_grande');
    }
    #iniciarEventos(){
        let insertarElementoBoundCalculadoraBasicaManagerImpl = this.calculadoraBasicaManager.insertarElemento.bind(this.calculadoraBasicaManager);
        this.botonesNumeros.forEach(botonNumero => botonNumero.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        }))
        this.botonBorrarNumero.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonCe.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonC.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonMultiplicacion.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonDivision.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonIgual.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonResta.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonSuma.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonMasMenos.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
        this.botonDecimal.addEventListener('click', function(){
            insertarElementoBoundCalculadoraBasicaManagerImpl(this);
        })
    }
    static getInstance(){
        if(!CalculadoraObserverImpl.#singleton){
            CalculadoraObserverImpl.#llamadaDesdeEstaClase = true;
            CalculadoraObserverImpl.#singleton = new CalculadoraObserverImpl();
            CalculadoraObserverImpl.#llamadaDesdeEstaClase = false;
        }
        return CalculadoraObserverImpl.#singleton;
    }
    setCalculadoraBasicaManager(calculadoraBasicaManager){
        if(!(calculadoraBasicaManager instanceof CalculadoraBasicaManagerImpl)){
            throw new Error('El parámetro deber ser instancia de CalculadoraBasicaManagerImpl');
        }
        this.calculadoraBasicaManager = calculadoraBasicaManager;
        this.#iniciarEventos();
    }
}