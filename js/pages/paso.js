const tipoEleccion = 1;
localStorage.clear();
let anios = document.getElementById('year')
fetch("https://resultados.mininterior.gob.ar/api/menu/periodos")
    .then(response => {
        // Si no es exitoso retorno el error
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('No se pudo obtener la información');
        }
    })
    .then(data => {
        data.forEach(item => {
            const nuevaOpcion = new Option(item, item);
            anios.appendChild(nuevaOpcion);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

muestra_oculta('verde')
muestra_oculta('rojo')
muestra_oculta('amarillo')

function cargarCargos() {
    const anios = document.getElementById('year')
    const cargoFiltro = document.getElementById('cargo');
    for (var i = cargoFiltro.options.length - 1; i >= 0; i--) {
        if (cargoFiltro.options[i].value !== "vacio") {
            cargoFiltro.remove(i);
        }
    }
    const distritoFiltro = document.getElementById('distritos');
    for (var i = distritoFiltro.options.length - 1; i >= 0; i--) {
        if (distritoFiltro.options[i].value !== "vacio") {
            distritoFiltro.remove(i);
        }
    }
    const seccionFiltro = document.getElementById('seccion_filtro');
    for (var i = seccionFiltro.options.length - 1; i >= 0; i--) {
        if (seccionFiltro.options[i].value !== "vacio") {
            seccionFiltro.remove(i);
        }
    }
    fetch("https://resultados.mininterior.gob.ar/api/menu?año=" + anios.value)
        .then(response => {
            // Si no es exitoso retorno el error
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('No se pudo obtener la información');
            }
        })
        .then(datosFiltros => {
            const jsonCadena = JSON.stringify(datosFiltros);
            localStorage.setItem('datosFiltros', jsonCadena);
            datosFiltros.forEach((eleccion) => {
                if (eleccion.IdEleccion == tipoEleccion) {
                    eleccion.Cargos.forEach((cargo) => {
                        const nuevaOpcion = new Option(cargo.Cargo, cargo.IdCargo);
                        cargoFiltro.appendChild(nuevaOpcion);
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function cargarDistritos() {
    const distritoFiltro = document.getElementById('distritos');
    const cargoFiltro = document.getElementById('cargo');
    for (var i = distritoFiltro.options.length - 1; i >= 0; i--) {
        if (distritoFiltro.options[i].value !== "vacio") {
            distritoFiltro.remove(i);
        }
    }
    const seccionFiltro = document.getElementById('seccion_filtro');
    for (var i = seccionFiltro.options.length - 1; i >= 0; i--) {
        if (seccionFiltro.options[i].value !== "vacio") {
            seccionFiltro.remove(i);
        }
    }
    const jsonCadena = localStorage.getItem('datosFiltros');
    const jsonObjeto = JSON.parse(jsonCadena);
    jsonObjeto.forEach((eleccion) => {
        if (eleccion.IdEleccion == tipoEleccion) {
            eleccion.Cargos.forEach((cargo) => {
                if (cargo.IdCargo === cargoFiltro.value) {
                    cargo.Distritos.forEach((itemDistrito) => {
                        const nuevaOpcion = new Option(itemDistrito.Distrito, itemDistrito.IdDistrito);
                        distritoFiltro.appendChild(nuevaOpcion);
                    })
                }
            })
        }
    });
}

function cargarSeccion() {
    const anios = document.getElementById('year')
    const cargoFiltro = document.getElementById('cargo');
    const distritoFiltro = document.getElementById('distritos');
    const seccionFiltro = document.getElementById('seccion_filtro');
    for (var i = seccionFiltro.options.length - 1; i >= 0; i--) {
        if (seccionFiltro.options[i].value !== "vacio") {
            seccionFiltro.remove(i);
        }
    }
    const jsonCadena = localStorage.getItem('datosFiltros');
    const jsonObjeto = JSON.parse(jsonCadena);
    jsonObjeto.forEach((eleccion) => {
        if (eleccion.IdEleccion == tipoEleccion) {
            let tipoRecuento = eleccion.Recuento;
            localStorage.setItem('tipoRecuento', tipoRecuento);
            eleccion.Cargos.forEach((cargo) => {
                if (cargo.IdCargo === cargoFiltro.value) {
                    cargo.Distritos.forEach((itemDistrito) => {
                        if (itemDistrito.IdDistrito == distritoFiltro.value) {
                            itemDistrito.SeccionesProvinciales.forEach((seccionesProvinciales) => {
                                document.getElementById('hdSeccionProvincial').innerHTML = seccionesProvinciales.IDSeccionProvincial
                                seccionesProvinciales.Secciones.forEach((Secciones) => {
                                    const nuevaOpcion = new Option(Secciones.Seccion, Secciones.IdSeccion);
                                    seccionFiltro.appendChild(nuevaOpcion);
                                })
                            })
                        }
                    })
                }
            })
        }
    });
}


function muestra_oculta(elementId) {
    switch (elementId) {
        case 'verde':
            mensaje_id = "success_mensaje"
            break;
        case 'rojo':
            mensaje_id = "error_mensaje"
            break;
        case 'amarillo':
            mensaje_id = "warning_mensaje"
            break;
    }

    const div = document.getElementById(mensaje_id);
    if (div) {
        if (div.style.display === 'flex' || div.style.display === '') {
            div.style.display = 'none';
        } else {
            div.style.display = 'flex';
        }
    }
}

function filtrar() {
    const cargoFiltro = document.getElementById('cargo');
    const distritoFiltro = document.getElementById('distritos');
    const seccionFiltro = document.getElementById('seccion_filtro');
    const anios = document.getElementById('year')
    let error = ''
    let erroresCant = 0
    if (anios.value === "vacio") {
        error += 'Año '
        erroresCant += 1
    }
    if (cargoFiltro.value === "vacio") {
        if (erroresCant > 0) {
            error += ','
        }
        error += 'Cargo '
        erroresCant += 1
    }
    if (distritoFiltro.value === "vacio") {
        if (erroresCant > 0) {
            error += ','
        }
        error += 'Distrito '
        erroresCant += 1
    }
    if (seccionFiltro.value === "vacio") {
        if (erroresCant > 0) {
            error += ','
        }
        error += 'Seccion '
        erroresCant += 1
    }
    let mensaje_amarillo = ''
    if (erroresCant > 0) {


        if (erroresCant == 1) {
            mensaje_amarillo = `   El filtro ${error}esta vacío, por favor complete todos los campos`
        } else if (erroresCant > 1) {
            mensaje_amarillo = `   Los filtros ${error}estan vacíos, por favor complete todos los campos`
        }
        document.getElementById('mensaje_amarrillo').innerHTML = mensaje_amarillo
        muestra_oculta('amarillo')
    } else {

        let anioEleccion = anios.value
        let tipoRecuento = 1;//localStorage.getItem('tipoRecuento'); 
        let categoriaId = 2;
        let distritoId = distritoFiltro.value;
        let seccionProvincialId = document.getElementById('hdSeccionProvincial').value;
        let seccionId = seccionFiltro.value;
        let circuitoId = '';
        let mesaId = '';

        let url = "https://resultados.mininterior.gob.ar/api/resultados/getResultados"
        let parametros =`?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${categoriaId}&distritoId=${distritoId}&seccionProvincialId=${seccionProvincialId}&seccionId=${seccionId}&circuitoId=${circuitoId}&mesaId=${mesaId}`  
        console.log(url + parametros)
        fetch(url + parametros)
        .then(response => {
            // Si no es exitoso retorno el error
            if (response.status === 200) {
                console.log("status")
                return response.json();
            } else {
                let mensaje_rojo = "Hubo un error en la comunicación con el servidor, por favor contactese con soporte"
                document.getElementById('mensaje_rojo').innerHTML = mensaje_rojo
                muestra_oculta('rojo')
            }
        })
        .then(datosApi => {
            console.log("API")
            console.log(datosApi)
            // Aca no entra porque directamente no anda la api
            
            let divElecciones = document.getElementById('elecciones_div')
            divElecciones.display = 'flex'
            // poner display y cambiar los titulos
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
