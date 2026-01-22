// ================================
// IMPORTACIONES Y CONFIGURACIÓN BASE
// ================================

// Importa funciones principales de Gulp:
// - src: toma archivos de origen
// - dest: envía archivos al destino
// - watch: observa cambios en archivos
// - series: ejecuta tareas en secuencia
// - parallel: ejecuta tareas en paralelo
const { src, dest, watch, series, parallel } = require('gulp');

// Importa el compilador de SASS para Gulp usando Dart Sass
const sass = require('gulp-sass')(require('sass'));

// Autoprefixer: agrega prefijos automáticos para compatibilidad con navegadores
const autoprefixer = require('autoprefixer');

// PostCSS: permite ejecutar plugins como autoprefixer y cssnano
const postcss = require('gulp-postcss')

// Sourcemaps: crea mapas para depurar CSS/JS en el navegador (ver el origen real)
const sourcemaps = require('gulp-sourcemaps')

// Cssnano: minifica el CSS (reduce peso del archivo)
const cssnano = require('cssnano');

// Concat: une varios archivos JS en uno solo
const concat = require('gulp-concat');

// Terser: minifica el JavaScript (optimiza el tamaño)
const terser = require('gulp-terser-js');

// Rename: renombra archivos (por ejemplo agregar .min)
const rename = require('gulp-rename');

// Imagemin: comprime imágenes para reducir peso
const imagemin = require('gulp-imagemin'); // Minificar imagenes 

// Notify: muestra notificaciones en el sistema cuando una tarea termina
const notify = require('gulp-notify');

// Cache: guarda en caché imágenes ya procesadas para no repetir el trabajo
const cache = require('gulp-cache');

// Clean: permite limpiar carpetas/archivos (en este código no se está usando aún)
const clean = require('gulp-clean');

// Webp: convierte imágenes a formato WebP (más liviano que JPG/PNG en muchos casos)
const webp = require('gulp-webp');


// ================================
// RUTAS (PATHS) DEL PROYECTO
// ================================

// Objeto con las rutas de los archivos a observar y procesar
const paths = {
    scss: 'src/scss/**/*.scss',  // Todos los .scss dentro de src/scss y subcarpetas
    js: 'src/js/**/*.js',        // Todos los .js dentro de src/js y subcarpetas
    imagenes: 'src/img/**/*'     // Todas las imágenes dentro de src/img y subcarpetas
}


// ================================
// TAREA: CSS (COMPILAR SCSS + MINIFICAR)
// ================================

function css() {
    return src(paths.scss)               // Toma todos los archivos SCSS
        .pipe(sourcemaps.init())         // Inicia el mapeo para debug
        .pipe(sass())                    // Compila SCSS a CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // Aplica autoprefixer + minifica CSS
        // .pipe(postcss([autoprefixer()])) // Alternativa: solo autoprefixer (sin minificar)
        .pipe(sourcemaps.write('.'))     // Genera el archivo .map en la misma carpeta
        .pipe(dest('build/css'));        // Guarda el CSS final en build/css
}


// ================================
// TAREA: JAVASCRIPT (CONCAT + MINIFICAR)
// ================================

function javascript() {
    return src(paths.js)                 // Toma todos los JS del proyecto
      .pipe(sourcemaps.init())           // Inicia sourcemaps para debug
      .pipe(concat('bundle.js'))         // Une todo en un único archivo: bundle.js
      .pipe(terser())                    // Minifica el código JS
      .pipe(sourcemaps.write('.'))       // Genera sourcemaps
      .pipe(rename({ suffix: '.min' }))  // Renombra agregando ".min" => bundle.min.js
      .pipe(dest('./build/js'))          // Guarda en build/js
}


// ================================
// TAREA: IMÁGENES (OPTIMIZACIÓN / COMPRESIÓN)
// ================================

function imagenes() {
    return src(paths.imagenes)               // Toma todas las imágenes de src/img
        .pipe(cache(imagemin({ optimizationLevel: 3 }))) // Comprime y guarda caché
        .pipe(dest('build/img'))             // Envía a build/img
        .pipe(notify('Imagen Completada' )); // Notificación al finalizar
}


// ================================
// TAREA: CREAR VERSIÓN WEBP DE LAS IMÁGENES
// ================================

function versionWebp() {
    return src(paths.imagenes)                  // Toma todas las imágenes originales
        .pipe(webp())                           // Convierte a formato WebP
        .pipe(dest('build/img'))                // Guarda las WebP en build/img
        .pipe(notify({ message: 'Imagen Completada' })); // Notifica al terminar
}


// ================================
// TAREA: WATCH (OBSERVAR CAMBIOS)
// ================================

function watchArchivos() {
    // Cuando cambie un SCSS, recompila CSS
    watch(paths.scss, css);

    // Cuando cambie un JS, vuelve a generar el bundle minificado
    watch(paths.js, javascript);

    // Cuando cambie una imagen, vuelve a optimizar
    watch(paths.imagenes, imagenes);

    // Cuando cambie una imagen, vuelve a generar su versión WebP
    watch(paths.imagenes, versionWebp);
}


// ================================
// EXPORTACIÓN DE TAREAS
// ================================

// Permite ejecutar desde consola: gulp css
exports.css = css;

// Permite ejecutar desde consola: gulp watchArchivos
exports.watchArchivos = watchArchivos;

// Tarea por defecto al ejecutar: gulp
// Ejecuta en paralelo:
// - css
// - javascript
// - imagenes
// - versionWebp
// - watchArchivos (se queda escuchando cambios)
exports.default = parallel(css, javascript, imagenes, versionWebp, watchArchivos);
