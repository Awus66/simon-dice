probarBorrarMensajesDeError();
probarCrearMensajeDeError();
probarLimpiarMarcoError();
probarLimpiarFamiliares();
probarOcultarBotonCalculo();
probarOcultarResultados();
probarValidarCantidadFamiliares();
probarValidarEdades();

function probarBorrarMensajesDeError(){
    let cantidadErrores = 0;
    const $prueba = document.createElement('div');
    $prueba.id = "errores";
    $prueba.innerText = "Mensaje de error";
    document.body.appendChild($prueba);
    borrarMensajesDeError();
    document.querySelectorAll('#errores').forEach(function($error) {
        if ($error.innerHTML !== ""){
            cantidadErrores++;
        }
    });
    const hayErrores = cantidadErrores !== 0;
    console.assert(
        !hayErrores, 'La función borrarMensajesDeError no borró los mensajes de error correctamente.'
    );
    $prueba.remove();
}


function probarCrearMensajeDeError(){
    const $errorInnerHTML = document.querySelectorAll('#errores').innerHTML;
    const $prueba = document.createElement('div');
    $prueba.id = "errores";
    document.body.appendChild($prueba);
    crearMensajeDeError();
    console.assert(
        $errorInnerHTML !== "", 'La función crearMensajeDeError no creó el mensaje de error correctamente.'
    );
    $prueba.remove();
    borrarMensajesDeError();
}


function probarLimpiarMarcoError(){
    const $prueba = document.createElement('div');
    $prueba.id = "prueba";
    $prueba.classList.add('error');
    document.body.appendChild($prueba);
    limpiarMarcoError('prueba');
    console.assert(
        !($prueba.classList.contains('error')), 'La función limpiarMarcoError no limpió el marco rojo de error correctamente.'
    );
}


function probarLimpiarFamiliares(){
    let cantidadFamiliares = 0;
    const $prueba = document.createElement('div');
    $prueba.classList.add('familiar');
    document.body.appendChild($prueba);
    limpiarFamiliares();
    document.querySelectorAll('.familiar').forEach(function (){
        cantidadFamiliares++;
    });
    const hayFamiliares = cantidadFamiliares !== 0;
    console.assert(
        !hayFamiliares, 'La función limpiarFamiliares no borró los familiares correctamente.'
    );
    $prueba.remove();
}


function probarOcultarBotonCalculo(){
    const $prueba = document.createElement('button');
    $prueba.id = "boton-calcular";
    document.body.appendChild($prueba);
    ocultarBotonCalculo();
    console.assert(
        $prueba.style.display === 'none', 'ocultarBotonCalculo no ocultó el botón correctamente.'
    );
    $prueba.remove();

}


function probarOcultarResultados(){
    const $prueba = document.createElement('div');
    $prueba.id = "resultados";
    document.body.appendChild($prueba);
    ocultarResultados();
    console.assert(
        $prueba.style.display === 'none', 'ocultarResultados no ocultó los resultados correctamente.'
    );
    $prueba.remove();   
}


function probarValidarCantidadFamiliares(){
    const $inputFamiliares = document.querySelector('#cantidad-familiares');
    const valorOriginal = $inputFamiliares.value;

    $inputFamiliares.value = 3.4;
    validarCantidadFamiliares();
    console.assert(
        $inputFamiliares.className === 'error', 'validarCantidadFamiliares no validó correctamente que el input no pueda tener números decimales.'
    );

    $inputFamiliares.value = -3;
    validarCantidadFamiliares();
    console.assert(
        $inputFamiliares.className === 'error', 'validarCantidadFamiliares no validó correctamente que el input no pueda tener números negativos.'
    );

    $inputFamiliares.value = '';
    validarCantidadFamiliares();
    console.assert(
        $inputFamiliares.className === 'error', 'validarCantidadFamiliares no validó correctamente que el input no pueda estar vacío.'
    );

    $inputFamiliares.value = 3;
    validarCantidadFamiliares();
    console.assert(
        !($inputFamiliares.className === 'error'), 'validarCantidadFamiliares no funcionó con un input válido.'
    );

    // Establezco su valor al default
    $inputFamiliares.value = valorOriginal;

    // Limpio lo que hizo el input anterior
    limpiarFamiliares();
}


function probarValidarEdades(){
    const $prueba = document.createElement('input');
    $prueba.classList.add('edad');
    document.body.appendChild($prueba);


    $prueba.value = 'a';
    validarEdades();
    console.assert(
        $prueba.classList.contains('error'), 'validarEdad no validó correctamente que el input no pueda tener caracteres.'
    );

    $prueba.value = 3.4;
    validarEdades();
    console.assert(
        $prueba.classList.contains('error'), 'validarEdad no validó correctamente que el input no pueda tener decimales.'
    );

    $prueba.value = -4;
    validarEdades();
    console.assert(
        $prueba.classList.contains('error'), 'validarEdad no validó correctamente que el input no pueda tener números negativos.'
    );

    $prueba.value = '';
    validarEdades();
    console.assert(
        $prueba.classList.contains('error'), 'validarEdad no validó correctamente que el input no pueda estar vacío.'
    );

    $prueba.value = 5;
    validarEdades();
    console.assert(
        !($prueba.classList.contains('error')), 'validarEdad no funcionó con un input válido.'
    );

    $prueba.remove();
    resetear();
}

