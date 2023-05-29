"use strict";
// Capturo elementos HTML...
let display = document.getElementById('resultado');
const botonNumeros = document.querySelectorAll('.numero')
const botonOperadores = document.querySelectorAll('.operador')
const botonClear = document.getElementById('botonClear')
const botonBorrarUno = document.getElementById('clearOne')
const botonIgual = document.getElementById('botonIgual')
let operacionActual = '';
let operacionAnterior = '';
let operacion = undefined;

//Recorro arreglo de botonNumeros y aplico evento a cada boton de numeros...
botonNumeros.forEach(boton => {
    boton.addEventListener('click', () => {
        agregarNumero(boton.innerText);
        actualizarDisplay()
    })
})
//Recorro arreglo de botonOperadores y aplico evento a cada boton de operacion...
botonOperadores.forEach(function (boton) {
    boton.addEventListener('click', function () {
        selecOperacion(boton.innerText);

    })
})
// Agrego evento al boton igual...
botonIgual.addEventListener('click', function () {
    calcular();
    actualizarDisplay();
})
// Agrego evento al boton clear...
botonClear.addEventListener('click', function () {
    clear();
    actualizarDisplay();
})
// Agrego evento al botonBorrarUno...
botonBorrarUno.addEventListener('click', function () {
    clearOne();
})

// Creo las funciones ...
function selecOperacion(op) {
    if (operacionActual === '') return;
    if (operacionAnterior !== '') {
        calcular()
    }
    operacion = op.toString();
    operacionAnterior = operacionActual;
    operacionActual = '';

}
function agregarNumero(num) {
    if (display.value.includes('.') && num === '.') {
        return
    }else {
        operacionActual = operacionActual.toString() + num.toString();
    }    

    actualizarDisplay();
}

function actualizarDisplay() {
    display.value = operacionActual;
}

function clear() {
    operacionActual = '';
    operacionAnterior = '';
    operacion = undefined;
}

function clearOne() {
    display.value = display.value.slice(0, -1);
    operacionActual = display.value    
}

function calcular() {
    let calculo;
    const anterior = parseFloat(operacionAnterior);
    const actual = parseFloat(operacionActual);
    if (isNaN(anterior) || isNaN(actual)) return;
    if (operacion === '+') {
        calculo = result(anterior, actual, sumar)
    }
    if (operacion === '-') {
        calculo = result(anterior, actual, restar)

    }
    if (operacion === 'x') {
        calculo = result(anterior, actual, multiplicar)

    }
    if (operacion === '/') {
        calculo = result(anterior, actual, dividir)

    }
    operacionActual = calculo;
    operacion = undefined;
    operacionAnterior = '';
}

function result(anterior, actual, cb) {
    return cb(anterior, actual)
}
function sumar(anterior, actual) {
    return anterior + actual
}

function restar(anterior, actual) {
    return anterior - actual
}

function multiplicar(anterior, actual) {
    return anterior * actual
}

function dividir(anterior, actual) {
    if (actual === 0) {
        return "error"
    }
    return anterior / actual
}

clear();

