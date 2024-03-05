//Simón dice
//Inicio del programa
let secuenciaUsuario = [];
let secuenciaMaquina = [];
let ronda = 0;
let mayorRonda = 0;

//Actualiza mensaje de estado y ronda correspondientes al inicio del programa
cambiarMensajeEstado('Presiona "Iniciar" para comenzar el juego');
cambiarNumeroRonda('-');
bloquearCuadros();

document.querySelector('#boton-iniciar').onclick = iniciarJuego;


function cambiarMensajeEstado(estado, finDelJuego = false){
    const $mensajeEstado = document.querySelector('#mensaje-estado');
    $mensajeEstado.innerText = estado;

    if (finDelJuego) {
        $mensajeEstado.style.backgroundColor = 'salmon';
      } else {
        $mensajeEstado.style.backgroundColor = '#96c7fc';
      }
}




function cambiarNumeroRonda(numero){
    document.querySelector('#numero-ronda').innerText = numero;
}


function iniciarJuego(){
    secuenciaUsuario = [];
    secuenciaMaquina = [];
    ronda = 0;
    manejarRonda();
}


function manejarRonda(){
    cambiarMensajeEstado('Turno de la maquina');
    bloquearCuadros();

    const $cuadro = obtenerCuadroAleatorio();
    secuenciaMaquina.push($cuadro);

    const retrasoJugador = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach(($cuadro, indice) => {
        const retrasoResaltar = (indice + 1) * 1000;
        setTimeout(() => {
            resaltarCuadro($cuadro)
        }, retrasoResaltar);
    });

    setTimeout(() => {
        cambiarMensajeEstado('Turno del jugador');
        desbloquearCuadros();
    }, retrasoJugador);

    secuenciaUsuario = [];
    ronda++;
    cambiarNumeroRonda(ronda);
}


function bloquearCuadros(){
    document.querySelectorAll('.cuadro').forEach($cuadro => {
        $cuadro.onclick = function (){
        };
    });
}


function desbloquearCuadros(){
    document.querySelectorAll('.cuadro').forEach($cuadro => {
        $cuadro.onclick = manejarInputUsuario;
    });
}


function obtenerCuadroAleatorio(){
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * document.querySelectorAll('.cuadro').length);
    return $cuadros[indice];
}


function resaltarCuadro($cuadro){
    $cuadro.style.opacity = 1;
    setTimeout(() => {
        $cuadro.style.opacity = 0.65;
      }, 500);
}


function manejarInputUsuario(event){
    const $cuadro = event.target;
    resaltarCuadro($cuadro);    
    secuenciaUsuario.push($cuadro);

    const indice = secuenciaUsuario.length - 1;
    if (secuenciaUsuario[indice].id !== secuenciaMaquina[indice].id){
        terminarJuego();
    }

    if (secuenciaUsuario.length === secuenciaMaquina.length){
        bloquearCuadros();
        setTimeout(manejarRonda, 2000);
    }
}


function terminarJuego(){
    bloquearCuadros();
    cambiarMensajeEstado('Perdiste! Presiona "Iniciar" para volver a jugar', true);

    if(ronda>mayorRonda){
        mayorRonda = ronda;
        registrarMayorRonda(mayorRonda);
    }
}
