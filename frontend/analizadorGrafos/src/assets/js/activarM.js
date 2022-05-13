
function alertToast(mensaje) {
  M.toast({ html: mensaje, classes: 'rounded' });
}

function mostrarModal(titulo, mensaje) {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#pMessaje').innerHTML = mensaje;
    document.querySelector('#tituloMessaje').innerHTML = titulo;
    var elems = document.querySelector('#modalMostrar');
    let instace = M.Modal.init(elems, {});
    instace.open();
  });

}

