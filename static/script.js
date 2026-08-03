// Pantallas
const pInicio = document.getElementById('pantalla-inicio');
const pJuego = document.getElementById('pantalla-juego');
const pFin = document.getElementById('pantalla-fin');

// Botón Start
if (document.getElementById('btn-comenzar')) {
    document.getElementById('btn-comenzar').addEventListener('click', () => {
        pInicio.classList.add('oculto');
        pJuego.classList.remove('oculto');
    });
}

// Datos de la Operación
const n1 = parseInt(document.getElementById('num1').innerText);
const n2 = parseInt(document.getElementById('num2').innerText);
const tipoOp = document.getElementById('tipo_operacion').value;

let r1, r2, r3, r4, r5, r6, r7, r8, r9, r10;

if (tipoOp === 'suma') {
    r1 = Math.floor(n1 / 100) * 100;
    r2 = Math.floor((n1 % 100) / 10) * 10;
    r3 = n1 % 10;
    r4 = Math.floor(n2 / 100) * 100;
    r5 = Math.floor((n2 % 100) / 10) * 10;
    r6 = n2 % 10;
    r7 = r1 + r4;
    r8 = r2 + r5;
    r9 = r3 + r6;
    r10 = n1 + n2;
} else { // Resta
    r1 = Math.floor(n1 / 100) * 100;
    r2 = Math.floor((n1 % 100) / 10) * 10;
    r3 = n1 % 10;
    r4 = Math.floor(n2 / 100) * 100;
    r5 = Math.floor((n2 % 100) / 10) * 10;
    r6 = n2 % 10;
    r7 = r1 - r4;
    r8 = r2 - r5;
    r9 = r3 - r6;
    r10 = n1 - n2;
}

const respuestasCorrectas = {
    c1: r1, c2: r2, c3: r3,
    c4: r4, c5: r5, c6: r6,
    c7: r7, c8: r8, c9: r9,
    c10: r10
};

// Sistema de Vidas
let vidas = 3;
const corazonesEl = document.getElementById('corazones');
const foxBubble = document.getElementById('fox-bubble');

function actualizarCorazones() {
    if (vidas === 3) corazonesEl.innerText = "❤️❤️❤️";
    else if (vidas === 2) corazonesEl.innerText = "❤️❤️🖤";
    else if (vidas === 1) corazonesEl.innerText = "❤️🖤🖤";
    else corazonesEl.innerText = "🖤🖤🖤";
}

// Validar Casillas Numéricas
const casillas = document.querySelectorAll('.casilla');

casillas.forEach(input => {
    // Se valida cuando sale de la casilla (blur) o presiona Enter
    input.addEventListener('change', () => {
        validarCasilla(input);
    });
});

function validarCasilla(input) {
    const id = input.id;
    const val = parseInt(input.value);

    if (input.value === "") {
        input.classList.remove('correcta', 'incorrecta');
        return;
    }

    if (val === respuestasCorrectas[id]) {
        if (!input.classList.contains('correcta')) {
            input.classList.remove('incorrecta');
            input.classList.add('correcta');
            foxBubble.innerText = "¡Excelente!";
        }
    } else {
        if (!input.classList.contains('incorrecta')) {
            input.classList.remove('correcta');
            input.classList.add('incorrecta');
            vidas--;
            actualizarCorazones();
            foxBubble.innerText = "¡Ouch! Cuidado...";
            
            if (vidas <= 0) {
                mostrarFinJuego(false);
            }
        }
    }
    verificarVictoria();
}

// Validar Letras
const inputLetras = document.getElementById('c_letras');
const respLetras = document.getElementById('respuesta_correcta_letras').value.toLowerCase().trim();

inputLetras.addEventListener('change', () => {
    const txt = inputLetras.value.toLowerCase().trim();
    if (txt === "") {
        inputLetras.classList.remove('correcta', 'incorrecta');
    } else if (txt === respLetras) {
        inputLetras.classList.remove('incorrecta');
        inputLetras.classList.add('correcta');
        foxBubble.innerText = "¡Perfecto en letras!";
        verificarVictoria();
    } else {
        inputLetras.classList.remove('correcta');
        inputLetras.classList.add('incorrecta');
        vidas--;
        actualizarCorazones();
        foxBubble.innerText = "Revisá la ortografía...";
        if (vidas <= 0) mostrarFinJuego(false);
    }
});

function verificarVictoria() {
    let completado = true;
    for (let id in respuestasCorrectas) {
        const el = document.getElementById(id);
        if (parseInt(el.value) !== respuestasCorrectas[id]) {
            completado = false;
            break;
        }
    }

    const letrasOk = inputLetras.value.toLowerCase().trim() === respLetras;

    if (completado && letrasOk && vidas > 0) {
        mostrarFinJuego(true);
    }
}

function mostrarFinJuego(victoria) {
    pJuego.classList.add('oculto');
    pFin.classList.remove('oculto');
    
    const titulo = document.getElementById('titulo-fin');
    const mensaje = document.getElementById('mensaje-fin');
    const foxFinal = document.getElementById('fox-final');

    if (victoria) {
        if (vidas === 3) {
            titulo.innerText = "🏆 ¡VICTORIA PERFECTA! 🏆";
            mensaje.innerText = "¡Increíble! ¡Ganaste sin perder ninguna vida!";
            foxFinal.className = "pixel-fox fox-happy";
        } else {
            titulo.innerText = "⭐ ¡DESAFÍO COMPLETADO! ⭐";
            mensaje.innerText = "¡Muy bien hecho! La próxima lo haremos aún mejor.";
            foxFinal.className = "pixel-fox fox-idle";
        }
    } else {
        titulo.innerText = "💀 GAME OVER 💀";
        mensaje.innerText = "¡No te rindas! Volvé a intentarlo.";
        foxFinal.className = "pixel-fox fox-sad";
    }
}