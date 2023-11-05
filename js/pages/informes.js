muestra_oculta('verde')
muestra_oculta('rojo')
muestra_oculta('amarillo')

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
    console.log(elementId)
    console.log(div.style.display)
    if (div) {
      if (div.style.display === 'block' || div.style.display === '') {
        div.style.display = 'none';
      } else {
        div.style.display = 'block';
      }
    }
  }