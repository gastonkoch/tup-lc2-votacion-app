const tipoEleccion = 1;
const tipoRecuento = 1;

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

let divElecciones = document.getElementById('elecciones_div')
divElecciones.display = 'None'
document.getElementById('mensaje_amarrillo').innerHTML = "Debe seleccionar los valores a filtrar y hacer clic en el botón FILTRAR"
muestra_oculta('verde')
muestra_oculta('rojo')
// muestra_oculta('amarillo')

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
                    localStorage.setItem('cargo_seleccionado', cargo.Cargo);
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
            eleccion.Cargos.forEach((cargo) => {
                if (cargo.IdCargo === cargoFiltro.value) {
                    cargo.Distritos.forEach((itemDistrito) => {
                        if (itemDistrito.IdDistrito == distritoFiltro.value) {
                            localStorage.setItem('distrito_seleccionado', itemDistrito.Distrito);
                            itemDistrito.SeccionesProvinciales.forEach((seccionesProvinciales) => {
                                if (seccionesProvinciales.IDSeccionProvincial != undefined || seccionesProvinciales.IDSeccionProvincial != null) {
                                    document.getElementById('hdSeccionProvincial').innerHTML = seccionesProvinciales.IDSeccionProvincial
                                } else {
                                    document.getElementById('hdSeccionProvincial').innerHTML = ''
                                }
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

function guardarSeccion() {
    const cargoFiltro = document.getElementById('cargo');
    const distritoFiltro = document.getElementById('distritos');
    const seccionFiltro = document.getElementById('seccion_filtro');
    const jsonCadena = localStorage.getItem('datosFiltros');
    const jsonObjeto = JSON.parse(jsonCadena);
    jsonObjeto.forEach((eleccion) => {
        if (eleccion.IdEleccion == tipoEleccion) {
            eleccion.Cargos.forEach((cargo) => {
                if (cargo.IdCargo === cargoFiltro.value) {
                    cargo.Distritos.forEach((itemDistrito) => {
                        if (itemDistrito.IdDistrito == distritoFiltro.value) {
                            itemDistrito.SeccionesProvinciales.forEach((seccionesProvinciales) => {
                                seccionesProvinciales.Secciones.forEach((Secciones) => {
                                    if (Secciones.IdSeccion == seccionFiltro.value) {
                                        localStorage.setItem('seccion_seleccionado', Secciones.Seccion);
                                    }
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
    document.getElementById('warning_mensaje').style.display = 'None'
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
        let contadorBarras = 0
        let anioEleccion = anios.value
        let categoriaId = 2;
        let distritoId = distritoFiltro.value;
        let seccionProvincialId = document.getElementById('hdSeccionProvincial').value;
        let seccionId = seccionFiltro.value;
        let circuitoId = '';
        let mesaId = '';

        let url = "https://resultados.mininterior.gob.ar/api/resultados/getResultados"
        let parametros = `?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${categoriaId}&distritoId=${distritoId}&seccionProvincialId=${seccionProvincialId}&seccionId=${seccionId}&circuitoId=${circuitoId}&mesaId=${mesaId}`



        // console.log(url + parametros)

        fetch(url + parametros)
            .then(response => {
                // Si no es exitoso retorno el error
                if (response.status === 200) {
                    return response.json();
                } else {
                    let mensaje_rojo = "Hubo un error en la comunicación con el servidor, por favor contactese con soporte"
                    document.getElementById('mensaje_rojo').innerHTML = mensaje_rojo
                    muestra_oculta('rojo')
                }
            })
            .then(datosApi => {

                const estadoRecuento = datosApi.estadoRecuento;

                document.getElementById('mesaComputada').innerHTML = estadoRecuento.mesasTotalizadas
                document.getElementById('electores').innerHTML = estadoRecuento.cantidadElectores
                document.getElementById('participacionSobreEscrutado').innerHTML = estadoRecuento.participacionPorcentaje + "%"
                // console.log(datosApi)
                console.log(JSON.stringify(datosApi))
                if (estadoRecuento.mesasTotalizadas == 0) {
                    document.getElementById('mensaje_amarrillo').innerHTML = 'No se encontró información para la consulta realizada'
                    muestra_oculta('amarillo')
                } else {
                    let divElecciones = document.getElementById('elecciones_div')
                    divElecciones.style.display = 'block'
                    document.getElementById('titulo_elecciones').innerHTML = `Elecciones ${anioEleccion} | PASO`
                    // poner display y cambiar los titulos 
                    let divDatos = document.querySelector('.container')
                    let divTarjetas = document.querySelector('.tarjetas')
                    let divFooter = document.querySelector('.foot')

                    divDatos.style.display = 'flex';
                    divDatos.style.justifyContent = 'center';
                    divDatos.style.height = '130px';

                    divTarjetas.style.display = 'flex';
                    divTarjetas.style.width = '100%';
                    divTarjetas.style.justifyContent = 'center';
                    divTarjetas.style.marginBottom = '100px';
                    divFooter.style.margin = "0 20px";



                    let tituloElecciones = document.getElementById('subtitulo_elecciones')
                    tituloElecciones.display = 'block'
                    document.getElementById('subtitulo_elecciones').innerHTML = `${anioEleccion} > PASO>${localStorage.getItem('cargo_seleccionado')} > ${localStorage.getItem('distrito_seleccionado')} > ${localStorage.getItem('seccion_seleccionado')}`



                    for (let i = 0; i < mapas.length; i++) {
                        const provincia = mapas[i].provincia;
                        if (localStorage.getItem('distrito_seleccionado').toUpperCase() == provincia.toUpperCase()) {
                            document.getElementById('provinciaSeleccionada').innerHTML = mapas[i].provincia;
                            document.getElementById('provinciaSeleccionadaImagen').innerHTML = mapas[i].svg;
                        }
                        let divDatos = document.querySelector('.container')
                        let divTarjetas = document.querySelector('.tarjetas')
                        let divFooter = document.querySelector('.foot')
                        let provinciaSeleccionadaImagen = document.getElementById('provinciaSeleccionadaImagen')
                        let provinciadiv = document.querySelector('.provincia')
                        divDatos.style.display = 'flex';
                        divDatos.style.justifyContent = 'center';
                        divDatos.style.height = '130px';
                        divTarjetas.style.display = 'flex';
                        divTarjetas.style.width = '100%';
                        divTarjetas.style.justifyContent = 'center';
                        divTarjetas.style.marginBottom = '100px';
                        divFooter.style.margin = "0 20px";
                        provinciaSeleccionadaImagen.style.height = '365px'
                        provinciadiv.style.height = '365px'
                        provinciadiv.style.display = 'flex';
                        provinciadiv.style.justifyContent = 'center';
                    }

                    let coloresBarra = {
                        '0008': ['rgb(255, 213, 0)', 'rgba(255, 213, 4, 0.3)'],
                        '0022': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        // SOLO HAY QUE AGREGAR COLORES Y ESTO YA ESTA, SACA LOS QUE PUEDAS DE LAS VARIABLES GLOBALES DEL CSS
                        '0259': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0268': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0298': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0309': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0503': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0511': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0518': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0526': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0546': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0552': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0561': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0567': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)'],
                        '0574': ['rgb(0, 169, 232)', 'rgba(0, 169, 232, 0.3)']
                    }



                    datosApi.valoresTotalizadosPositivos.forEach((agrupaciones) => {
                        console.log(agrupaciones.idAgrupacion)
                        const grilla = `
                            <h4 id="agrupacionNombre">${agrupaciones.nombreAgrupacion}</h4>
                        `;
                        document.getElementById('agrupaciones_politicas').innerHTML += grilla;
                        let primerColor;
                        let segundoColor;
                        // Mover el bloque if fuera del bucle de listas
                        console.log(coloresBarra.hasOwnProperty(agrupaciones.idAgrupacion))
                        if (coloresBarra.hasOwnProperty(agrupaciones.idAgrupacion)) {
                            let colores = coloresBarra[agrupaciones.idAgrupacion];
                            primerColor = colores[0];
                            segundoColor = colores[1];
                        } else {
                            primerColor = 'blue'
                        }
                        console.log(agrupaciones.votosPorcentaje)
                        // LA PARTE DE && agrupaciones.votosPorcentaje > 2) NO VA, ES SOLO PARA VER BARRAS ALTAS
                        if (contadorBarras < 8 && agrupaciones.votosPorcentaje > 2) {
                            document.getElementById('grid_barras').innerHTML += ` 
                                                    <div class="bar" style="--bar-value:${agrupaciones.votosPorcentaje}%;" data-name="${agrupaciones.nombreAgrupacion}" title="Your Blog 85%">
                                                        <div class="bar" style="--bar-value:${agrupaciones.votosPorcentaje}%;--bar-color:var(--grafica-amarillo);"
                                                            title="${agrupaciones.nombreAgrupacion}85%"></div>
                                                    </div>
                                                    `
                            contadorBarras += 1
                        }


                        agrupaciones.listas.forEach((lista) => {
                            let resultado = lista.votos * 100 / agrupaciones.votos;
                            let barraNumero;
                            let totalVotos;

                            if (resultado.toFixed(0) == 0 || isNaN(resultado)) {
                                barraNumero = "";
                            } else {
                                barraNumero = resultado.toFixed(0).toString() + "%";
                            }

                            const itemGrilla = `
                                <div class="partidopolitico">
                                    <div class="partidopoliticoleft">
                                        <p><b>${lista.nombre}</b></p>
                                    </div>
                                    <div class="partidopoliticoright">
                                        <p>${(resultado.toFixed(2))}%</p>
                                        <p>${lista.votos} VOTOS</p>
                                    </div>
                                </div>
                    
                                <div class="progress" style="background: ${segundoColor};">
                                    <div class="progress-bar" style="width:${resultado.toFixed(0)}%; background: ${primerColor};">
                                        <span class="progress-bar-text">${barraNumero}</span>
                                    </div>
                                </div>
                            `;

                            document.getElementById('agrupaciones_politicas').innerHTML += itemGrilla;
                        });
                    });

                    // datosApi.valoresTotalizadosPositivos.forEach((agrupaciones) => {

                    //     const grilla = `
                    //     <h4 id="agrupacionNombre">${agrupaciones.nombreAgrupacion}</h4>
                    //     `;
                    //     document.getElementById('agrupaciones_politicas').innerHTML += grilla
                    //     if (coloresBarra.hasOwnProperty(agrupaciones.idAgrupacion)) {
                    //         let colores = coloresBarra[agrupaciones.idAgrupacion];
                    //         let primerColor = colores[0];
                    //         // let segundoColor = colores[1];
                    //         console.log(primerColor)
                    //     }
                    //     agrupaciones.listas.forEach((lista) => {

                    //         let resultado = lista.votos * 100 / agrupaciones.votos
                    //         let barraNumero;
                    //         let totalVotos;
                    //         if (resultado.toFixed(0) == 0 || isNaN(resultado)){
                    //             barraNumero = ""
                    //         } 
                    //         else {
                    //             barraNumero = resultado.toFixed(0).toString() + "%"
                    //         }
                    //         const itemGrilla = `
                    //         <div class="partidopolitico">
                    //         <div class="partidopoliticoleft">
                    //             <p><b>${lista.nombre}</b></p>
                    //         </div>
                    //         <div class="partidopoliticoright">
                    //             <p>${(resultado.toFixed(2))}%</p>
                    //             <p>${lista.votos} VOTOS</p>
                    //         </div>
                    //     </div>

                    //     <div class="progress" style="background: var(--grafica-amarillo-claro);">
                    //         <div class="progress-bar" style="width:${resultado.toFixed(0)}%; background: ${primerColor};">
                    //             <span class="progress-bar-text">${barraNumero}</span>
                    //         </div>
                    //     </div>
                    //     </div>
                    //     `;

                    //         document.getElementById('agrupaciones_politicas').innerHTML += itemGrilla
                    //     })
                    //     // tarjeta.innerHTML += itemGrilla;

                    // })
                }


            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function agregaInforme() {
    let distritoFiltro = document.getElementById('distritos');
    const seccionFiltro = document.getElementById('seccion_filtro');
    const anios = document.getElementById('year')
    let anioEleccion = anios.value
    let categoriaId = 2;
    let distritoId = distritoFiltro.value;
    let seccionProvincialId = document.getElementById('hdSeccionProvincial').value;
    let seccionId = seccionFiltro.value;

    listaInformes = [anioEleccion, tipoRecuento, tipoEleccion, categoriaId, distritoId, seccionProvincialId, seccionId];
    localStorage.setItem('INFORMES', listaInformes);
}