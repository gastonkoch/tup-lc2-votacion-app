const tipoEleccion = 1;
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
        datosFiltros.forEach((eleccion) => {
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
})
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
        datosFiltros.forEach((eleccion) => {
            if (eleccion.IdEleccion == tipoEleccion) {
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
})
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
      if (div.style.display === 'block' || div.style.display === '') {
        div.style.display = 'none';
      } else {
        div.style.display = 'block';
      }
    }
  }

function filtrar(){
    alert("hola")
}
