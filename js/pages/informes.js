for (let i = 0; i < mapas.length; i++) {
  const provincia = mapas[i].provincia;
  if (localStorage.getItem('distrito_seleccionado').toUpperCase() == provincia.toUpperCase()) {
    document.getElementById('mapa').innerHTML = mapas[i].svg;
  }
}
document.getElementById('tablaPrincipal').style.display = 'none'
muestra_oculta('verde')
muestra_oculta('rojo')
muestra_oculta('amarillo')


const informeArray = localStorage.getItem('INFORMES');
var informe = informeArray.split(',')
if (informe && informe.length > 0) {
  let anioEleccion = informe[0];
  let tipoRecuento = informe[1];
  let tipoEleccion = informe[2];
  let categoriaId = informe[3];
  let distritoId = informe[4];
  let seccionProvincialId = informe[5];
  let seccionId = informe[6];
  let circuitoId = "";
  let mesaId = "";


  let titulo = localStorage.getItem('titulo');
  let subtitulo = localStorage.getItem('subtitulo');

  if (seccionProvincialId == 0) {
    seccionProvincialId = ""
  }
  for (let i = 0; i < mapas.length; i++) {
    const provincia = mapas[i].provincia;
    if (distritoId.toUpperCase() == provincia.toUpperCase()) {
      document.getElementById('provinciaSeleccionada').innerHTML = mapas[i].provincia;
      document.getElementById('provinciaSeleccionadaImagen').innerHTML = mapas[i].svg;
      console.log("PROVINCIA")
    }
  }
  document.getElementById('caja_c6').innerHTML += `
  <h2>${titulo}</h2>
  <p>${subtitulo}</p>
  `
  let url = "https://resultados.mininterior.gob.ar/api/resultados/getResultados"
  let parametros = `?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${categoriaId}&distritoId=${distritoId}&seccionProvincialId=${seccionProvincialId}&seccionId=${seccionId}&circuitoId=${circuitoId}&mesaId=${mesaId}`

  console.log(url + parametros)

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

      datosApi.valoresTotalizadosPositivos.forEach((agrupaciones) => {
        document.getElementById('leftgrilla').innerHTML += `
        <p>${agrupaciones.nombreAgrupacion}</p> 
      `;
        document.getElementById('rigthgrilla').innerHTML += `
        <p>${agrupaciones.votosPorcentaje}% <br>${agrupaciones.votos} votos</p>
        `;
        document.getElementById('tablaPrincipal').style.display = 'flex'
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

} else {
  document.getElementById('mensaje_amarrillo').innerHTML = "No hay informes guardados para mostrar"
  muestra_oculta('amarillo')
}

// FUNCION ASYNC NO UTILIZADA
// async function obtenerInformes() {
//   const informeArray = localStorage.getItem('INFORMES');

//   if (!informeArray) {
//     // No hay informes, salir de la función
//     return;
//   }

//   let url = "https://resultados.mininterior.gob.ar/api/resultados/getResultados";
//   let parametros = `?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${categoriaId}&distritoId=${distritoId}&seccionProvincialId=${seccionProvincialId}&seccionId=${seccionId}&circuitoId=${circuitoId}&mesaId=${mesaId}`;

//   console.log(url + parametros);

//   try {
//     const response = await fetch(url + parametros);

//     if (response.status === 200) {
//       const datosApi = await response.json();

//       const estadoRecuento = datosApi.estadoRecuento;

//       document.getElementById('mesaComputada').innerHTML = estadoRecuento.mesasTotalizadas
//       document.getElementById('electores').innerHTML = estadoRecuento.cantidadElectores
//       document.getElementById('participacionSobreEscrutado').innerHTML = estadoRecuento.participacionPorcentaje + "%"

//       datosApi.valoresTotalizadosPositivos.forEach((agrupaciones) => {
//         document.getElementById('leftgrilla').innerHTML += `
//         <p>${agrupaciones.nombreAgrupacion}</p> 
//       `;
//         document.getElementById('rigthgrilla').innerHTML += `
//         <p>${agrupaciones.votosPorcentaje}% <br>${agrupaciones.votos} votos</p>
//         `;
//       });
      
//       document.getElementById('tablaPrincipal').style.display = 'flex'
//     } else {
//       let mensajeRojo = "Hubo un error en la comunicación con el servidor, por favor contáctese con soporte";
//       document.getElementById('mensaje_rojo').innerHTML = mensajeRojo;
//       muestra_oculta('rojo');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// obtenerInformes();

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