class Persona{
    speak(){}
}
function mixin(base){
    return class extends base{
        doSomething(){}
    }
}
function mixin2(base){
    return class extends base{
        doSomethingElse(){}
    }
}

const arrayInterfaces = [mixin, mixin2];

export function customMixin(claseBase){
    if(typeof claseBase != 'function'){
        throw new Error('La variable pasada por parámetros debe ser una clase (del tipo ES6)')
    }
    let claseAnonima = class extends claseBase{}
    return function(...interfaz){
        console.log(interfaz);
        return interfaz.reduce((a, b) => b(a), claseAnonima);
    }
}
