import {CalculadoraObserverResumen} from './CalculadoraObserverResumen.js';
import {CalculadoraObserverNumeroPrincipal} from './CalculadoraObserverNumeroPrincipal.js';
import { customMixin } from './MixinsWithCommas.js';

export const CalculadoraObserver = base => {
        return class extends customMixin(base)(CalculadoraObserverResumen, CalculadoraObserverNumeroPrincipal){
    }
}
