console.log("✅ JS cargado");

/**Menu hamburguesa */

document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
});

function eventListeners() {
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenu.addEventListener('click', navegacionResponsive);
}

function navegacionResponsive() {
    // console.log('Menu responsive');
    const navegacion = document.querySelector ('.navegacion');

    // if(navegacion.classList.contains('mostrar')) {
    //     navegacion.classList.remove('mostrar');
    // }

    navegacion.classList.toggle('mostrar') 
    // esta la piedes unsar en reemplazo del IF hace lo mismo quita o pone ela clase mostrar de acuerdo al evento en este caso un click
}

/** fin */