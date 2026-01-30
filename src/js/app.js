console.log("✅ JS cargado"); // Verifica en consola que el archivo JS se cargó correctamente

document.addEventListener('DOMContentLoaded', function () { // Espera a que el DOM esté listo antes de ejecutar funciones
  eventListeners(); // Registra los event listeners del sitio (menú móvil)
  darkMode(); // Inicializa y gestiona el modo oscuro
}); // Fin del listener DOMContentLoaded

/** drak mode */ // Sección: modo oscuro (el texto tiene typo, pero se deja igual)

function darkMode() { // Define la función que configura el modo oscuro
    const prefiereDarkMode = window.matchMedia('(prefers-color-scheme: dark)'); // Detecta si el sistema prefiere tema oscuro
    console.log(prefiereDarkMode.matches); // Debug: true/false según la preferencia actual del sistema

    if(prefiereDarkMode.matches) { // Si el sistema está en modo oscuro
        document.body.classList.add('dark-mode'); // Activa modo oscuro agregando la clase al body
    }else{ // Si el sistema está en modo claro
        document.body.classList.remove('dark-mode'); // Desactiva modo oscuro removiendo la clase del body
    } // Fin del if/else inicial

    prefiereDarkMode.addEventListener('change', function(){ // Escucha cambios del tema del sistema (cuando el usuario cambia el tema del SO)
        if(prefiereDarkMode.matches) { // Si el nuevo estado es oscuro
        document.body.classList.add('dark-mode'); // Activa modo oscuro
        }else{ // Si el nuevo estado es claro
        document.body.classList.remove('dark-mode'); // Desactiva modo oscuro
        } // Fin del if/else dentro del listener
    } // Fin de la función callback del change
        
    ); // Cierre del addEventListener('change', ...)

    const botonDarkMode = document.querySelector('.dark-mode-boton'); // Selecciona el botón que permite alternar modo oscuro manualmente

    botonDarkMode.addEventListener('click', function(){ // Asigna evento click al botón de modo oscuro
        document.body.classList.toggle('dark-mode'); // Alterna la clase: si existe la quita, si no existe la agrega
    }); // Fin del listener click
} // Fin de la función darkMode

/**Menu hamburguesa */ // Sección: menú hamburguesa (responsive)
function eventListeners() { // Función que centraliza la asignación de listeners
    const mobileMenu = document.querySelector('.mobile-menu'); // Selecciona el botón/ícono del menú móvil (hamburguesa)

    mobileMenu.addEventListener('click', navegacionResponsive); // Click => ejecuta la función que muestra/oculta la navegación
} // Fin de la función eventListeners

function navegacionResponsive() { // Muestra u oculta el menú de navegación en pantallas pequeñas
    // console.log('Menu responsive'); // Debug opcional: imprime mensaje al activar el menú (está comentado)
    const navegacion = document.querySelector ('.navegacion'); // Selecciona el contenedor de navegación

    // if(navegacion.classList.contains('mostrar')) { // Alternativa: validar si ya tiene la clase 'mostrar'
    //     navegacion.classList.remove('mostrar'); // Si la tiene, la remueve (oculta el menú)
    // } // Fin del bloque if comentado

    navegacion.classList.toggle('mostrar') // Alterna la clase 'mostrar' para mostrar/ocultar el menú
} // Fin de la función navegacionResponsive
