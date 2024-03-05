document.querySelector('#boton-agregar').onclick = agregarFamiliar;
document.querySelector('#boton-quitar').onclick = borrarFamiliar;
document.querySelector('#boton-calcular').onclick = validarSueldos;
document.querySelector('#boton-resetear').onclick = resetear;

function agregarFamiliar() {

    //Creo un div para poder manejar de manera libre a cada familiar
    const $nuevoFamiliar = document.createElement('div');
    $nuevoFamiliar.classList.add('familiar');

    const $nuevoLabel = document.createElement('label');
    index = (document.getElementsByClassName('familiar').length)+1
    $nuevoLabel.for = 'integrante' + index;
    $nuevoLabel.textContent = `Sueldo del familiar numero ${index}:`;

    const $nuevoInput = document.createElement('input');
    $nuevoInput.classList.add('sueldo');
    $nuevoInput.id = 'integrante' + (index);
    $nuevoInput.min = '1';
    $nuevoInput.placeholder = 'Sueldo';
    $nuevoInput.type = 'number';

    $nuevoFamiliar.appendChild($nuevoLabel);
    $nuevoFamiliar.appendChild($nuevoInput);
    document.querySelector('#familiares').appendChild($nuevoFamiliar);
    document.querySelector('form').appendChild(document.createElement('br'));
    
    document.querySelector('#boton-resetear').style.display = '';
    document.querySelector('#boton-calcular').style.display = '';
    document.querySelector('#boton-quitar').style.display = '';
}


function borrarFamiliar() {
    //Quito el último miembro familiar de la lista
    const $familiares = document.querySelectorAll('.familiar');
    const index = document.getElementsByClassName('familiar').length - 1;
    $familiares[index].remove();

    //Evaluo si quedaron integrantes o no para esconder el boton de calcular
    if (document.getElementsByClassName('familiar').length === 0){  
        document.querySelector('#boton-resetear').style.display = 'none';
        document.querySelector('#boton-calcular').style.display = 'none';
        document.querySelector('#boton-quitar').style.display = 'none';
        borrarMensajesDeError();
    }
}


function validarSueldos() {
    let sueldos = [];
    let cantidadErrores = 0;

    document.querySelectorAll('.sueldo').forEach(function (sueldo){
        const valorSueldo = Number(sueldo.value);
        if(Number.isInteger(valorSueldo) && valorSueldo > 0 && /^[0-9]+$/.test(valorSueldo)){
            sueldos.push(valorSueldo); 
        }
        else{
            sueldo.classList.add('error');
            crearMensajeDeError();
            cantidadErrores++;
        }
    });

    const hayError = cantidadErrores !== 0;
    if (!hayError){
        const mayorSueldo = Math.max(...sueldos);
        const menorSueldo = Math.min(...sueldos);
        const promedioSueldos = calcularPromedio(sueldos);
        document.querySelector('#promedio-sueldo').textContent = 'El promedio de sueldo es ' + promedioSueldos;
        document.querySelector('#mayor-sueldo').textContent = 'El mayor sueldo es ' + mayorSueldo;
        document.querySelector('#menor-sueldo').textContent = 'El menor sueldo es ' + menorSueldo;

        document.querySelector('#resultados').style.display = '';   
    }
}


function calcularPromedio(sueldos){
    //Algoritmo para promedio
    let promedio = 0;
    for (let i = 0; i < sueldos.length; i++)
    {
        promedio += sueldos[i];
    }

    return (promedio / sueldos.length);
}


function limpiarFamiliares(){
    //Borrar familiares anteriores
    document.querySelectorAll('.familiar').forEach(function ($familiar){
        $familiar.remove();
    });
}


function ocultarBotones(){
    document.querySelectorAll('#boton-calcular').forEach(function ($botonCalcular){
        $botonCalcular.style.display = 'none';
    });
    document.querySelectorAll('#boton-resetear').forEach(function ($botonResetear){
        $botonResetear.style.display = 'none';
    });
    document.querySelectorAll('#boton-quitar').forEach(function ($botonQuitar){
        $botonQuitar.style.display = 'none';
    });
}


function ocultarResultados(){
    document.querySelectorAll('#resultados').forEach(function ($resultados){
        $resultados.style.display = 'none';
    });
}


function resetear(){
    limpiarFamiliares();
    ocultarBotones();
    ocultarResultados();
    borrarMensajesDeError();
    limpiarMarcosDeError('.sueldo');
}


function crearMensajeDeError(){
    const $error = document.querySelector('#errores');
    $error.innerHTML = "";

    const $nuevoMensajeError = document.createElement('li');
    $nuevoMensajeError.id = "mensaje-error";
    $nuevoMensajeError.innerText = 'El sueldo debe ser un número positivo.';
    $error.appendChild($nuevoMensajeError);
}


function borrarMensajesDeError(){
    //const $error = document.querySelectorAll('#errores');
    document.querySelectorAll('#errores').forEach(function ($error){
        $error.innerHTML = "";
    });
}


function limpiarMarcosDeError(identificador){
    document.querySelectorAll(`${identificador}`).forEach(function (sueldo){
        sueldo.classList.remove('error');
    });
}
