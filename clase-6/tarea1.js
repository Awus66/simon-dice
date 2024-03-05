document.querySelector('#boton-enviar-cantidad-familiares').onclick = validarCantidadFamiliares;
document.querySelector('#boton-calcular').onclick = validarEdades;
document.querySelector('#boton-resetear').onclick = resetear;

function validarEdades(){
    let cantidadErrores = 0;
    let edadInputs = document.getElementsByClassName('edad');

    //Creo un array de edades para hacer los cálculos finales más facilmente
    let edades = [];

    document.querySelectorAll('.edad').forEach(function(edad){
    const maxEdad = 120;
    const soloNumeros = /^[0-9]+$/.test(edad.value);
    const valorEdad = Number(edad.value);

    if ( valorEdad >= 0 && valorEdad <= maxEdad && soloNumeros && Number.isInteger(valorEdad)){
        edades.push(valorEdad);
        edad.classList.remove('error');
    }
    else{
        edad.classList.add('error');
    }
    });

    //Cuento la cantidad de edades que tienen la clase "error"
    for (let i = 0; i < edadInputs.length; i++){
        if (edadInputs[i].classList.contains('error')){
            cantidadErrores++;
        }
    }

    if(cantidadErrores === 0){
        borrarMensajesDeError();
        const mayorEdad = Math.max(...edades);
        const menorEdad = Math.min(...edades);
    
        //Algoritmo para promedio
        let promedio = 0;
        for (let i = 0; i < edades.length; i++)
        {   
        promedio += edades[i];
        }
        const promedioEdad = promedio / edades.length;
    
        document.querySelector('#mayor-edad').textContent = 'La mayor edad es ' + mayorEdad;
        document.querySelector('#menor-edad').textContent = 'La menor edad es ' + menorEdad;
        document.querySelector('#promedio-edad').textContent = 'El promedio de edad es ' + promedioEdad;
    
        document.querySelector('#resultados').style.display = '';   
    }
    else{
        crearMensajeDeError()
    }
}

function validarCantidadFamiliares(){
    const cantidadFamiliares = Number(document.querySelector('#cantidad-familiares').value);
    const soloNumeros = /^[0-9]+$/.test(cantidadFamiliares);
    const $error = document.querySelector('#errores');
    const $inputFamiliares = document.querySelector('#cantidad-familiares');

    if(!(soloNumeros && cantidadFamiliares > 0 && cantidadFamiliares < 100 && Number.isInteger(cantidadFamiliares))){
        $inputFamiliares.className = 'error';
        $error.innerText = 'La cantidad de familiares debe ser un número entero entre 1 y 99';
    }
    else{
        $inputFamiliares.className = '';
        limpiarFamiliares();
        $error.innerHTML = "";

        for (let i = 1; i <= cantidadFamiliares; i++) {
            const $nuevoLabel = document.createElement('label');
    
            //Creo un div para poder manejar de manera libre a cada familiar
            const $nuevoDiv = document.createElement('div');
            $nuevoDiv.className = 'familiar';
    
            //$nuevoLabel.propiedad....
            $nuevoLabel.for = 'integrante' + i;
            $nuevoLabel.textContent = `Edad del familiar numero ${i}:`;
            const $nuevoInput = document.createElement('input');
            //nuevoInput.propiedad...
            $nuevoInput.className = 'edad';
            $nuevoInput.id = 'integrante' + (i);
            $nuevoInput.min = '0';
            $nuevoInput.max = '120';
            $nuevoInput.placeholder = 'Edad';
            $nuevoInput.type = 'number';
    
    
            $nuevoDiv.appendChild($nuevoLabel);
            $nuevoDiv.appendChild($nuevoInput);
            document.querySelector('#familiares').appendChild($nuevoDiv);
            document.querySelector('form').appendChild(document.createElement('br'));
        }
        document.querySelector('#boton-calcular').style.display = '';
    }
}


function limpiarFamiliares(){
    //Borrar familiares anteriores
    document.querySelectorAll('.familiar').forEach(function ($familiar){
        $familiar.remove();
    });
}


function ocultarBotonCalculo(){
    document.querySelectorAll('#boton-calcular').forEach(function (boton){
        boton.style.display = 'none';
    });
}


function ocultarResultados(){
    document.querySelectorAll('#resultados').forEach(function (resultados){
        resultados.style.display = 'none';
    });
}


function resetear(){
    limpiarFamiliares();
    ocultarBotonCalculo();
    ocultarResultados();
    borrarMensajesDeError();
    limpiarMarcoError('cantidad-familiares');
}


function crearMensajeDeError(){
    const $error = document.querySelector('#errores');
    $error.innerHTML = "";

    const $nuevoMensajeError = document.createElement('li');
    $nuevoMensajeError.id = "mensaje-error";
    $nuevoMensajeError.innerText = 'La edad debe ser un número entero entre 0 y 120.';
    $error.appendChild($nuevoMensajeError);
}


function limpiarMarcoError(id){
    const $input = document.querySelector(`#${id}`);
    $input.classList.remove('error');
}


function borrarMensajesDeError(){
    //const $error = document.querySelectorAll('#errores');
    document.querySelectorAll('#errores').forEach(function ($error){
        $error.innerHTML = "";
    });
}


