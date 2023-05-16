function validarRUT(rut) {
    rut = rut.replace(/[.-]/g, ''); // Eliminar puntos y guiones del RUT
    var cuerpo = rut.slice(0, -1);
    var digitoVerificador = rut.slice(-1).toUpperCase();
  
    var suma = 0;
    var multiplicador = 2;
  
    // Calcular la suma ponderada del RUT
    for (var i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplicador;
  
      multiplicador++;
      if (multiplicador > 7) {
        multiplicador = 2;
      }
    }
  
    var resultado = 11 - (suma % 11);
    var digitoCalculado = (resultado === 11) ? '0' : (resultado === 10) ? 'K' : resultado.toString();
  
    return digitoCalculado === digitoVerificador;
  }
  
  function mostrarMensaje(elementId, mensaje, esError) {
    var elemento = document.getElementById(elementId);
    elemento.textContent = mensaje;
  
    if (esError) {
      elemento.classList.add('error');
    } else {
      elemento.classList.remove('error');
    }
  }
  
  function validarFormulario() {
    var nameInput = document.getElementById('name');
    var rutInput = document.getElementById('rut');
    var emailInput = document.getElementById('email');
    var regionInput = document.getElementById('region');
    var comunaInput = document.getElementById('comuna');
    var candidatoInput = document.getElementById('candidato');
  
    var name = nameInput.value.trim();
    var rut = rutInput.value.trim();
    var email = emailInput.value.trim();
    var region = regionInput.value.trim();
    var comuna = comunaInput.value.trim();
    var candidato = candidatoInput.value.trim();
  
    // Validar campos requeridos
    if (name === '' || rut === '' || email === '' || region === '' || comuna === '' || candidato === '') {
      mostrarMensaje('mensaje', 'Por favor, complete todos los campos.', true);
      return false; // Evitar el envío del formulario
    }
  
    // Validar formato del email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      mostrarMensaje('mensaje', 'El email ingresado no es válido.', true);
      return false; // Evitar el envío del formulario
    }
  
    // Validar RUT chileno
    if (!validarRUT(rut)) {
      mostrarMensaje('mensaje', 'El RUT ingresado no es válido.', true);
      return false; // Evitar el envío del formulario
    }
  
    // Resto de la validación del formulario...
  
    mostrarMensaje('mensaje', 'Formulario válido', false);
    return true; // Permitir el envío del formulario si todos los campos son válidos
  }
  