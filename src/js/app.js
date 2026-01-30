console.log("✅ JS cargado");

/**Menu hamburguesa */

document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
  darkMode();
});

/** drak mode */

function darkMode() {
    const prefiereDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(prefiereDarkMode.matches);

    if(prefiereDarkMode.matches) {
        document.body.classList.add('dark-mode');
    }else{
        document.body.classList.remove('dark-mode');
    }

    prefiereDarkMode.addEventListener('change', function{
        if(prefiereDarkMode.matches) {
        document.body.classList.add('dark-mode');
        }else{
        document.body.classList.remove('dark-mode');
        }
    }
        
    );

    const botonDarkMode = document.querySelector('.dark-mode-boton');

    botonDarkMode.addEventListener('click', function(){
        document.body.classList.toggle('dark-mode');
    });
}

/**Menu hamburguesa */
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