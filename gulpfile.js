// ================================
// IMPORTACIONES Y CONFIGURACIÓN BASE
// ================================

console.log("✅ Gulpfile correcto cargado");
const { src, dest, watch, series, parallel } = require("gulp");

// SCSS (Dart Sass - API moderna)
const sass = require("gulp-sass")(require("sass"));

// PostCSS + plugins
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

// Sourcemaps
const sourcemaps = require("gulp-sourcemaps");

// JS
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const rename = require("gulp-rename");

// Imágenes
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const cache = require("gulp-cache");
const notify = require("gulp-notify");

// ================================
// RUTAS (PATHS) DEL PROYECTO
// ================================

const paths = {
  // Compila solo el entrypoint (evita compilar parciales _*.scss)
  scss: "src/scss/app.scss",
  scssAll: "src/scss/**/*.scss",

  js: "src/js/**/*.js",

  imagenes: "src/img/**/*",
};

// ================================
// TAREA: CSS (SCSS + POSTCSS + SOURCEMAPS)
// ================================

function css() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        // outputStyle: "expanded", // opcional (expanded | compressed)
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));
}

// ================================
// TAREA: JAVASCRIPT (CONCAT + MINIFICAR + SOURCEMAPS)
// ================================

function javascript() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(terser({ ecma: 2020 }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/js"));
}

// ================================
// TAREA: IMÁGENES (OPTIMIZACIÓN)
// ================================

function imagenes() {
  return src(paths.imagenes)
    .pipe(cache(imagemin({ optimizationLevel: 3 })))
    .pipe(dest("build/img"))
    .pipe(notify({ message: "Imágenes optimizadas ✅", onLast: true }));
}

// ================================
// TAREA: CREAR VERSIÓN WEBP
// ================================

function versionWebp() {
  return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest("build/img"))
    .pipe(notify({ message: "Imágenes WebP creadas ✅", onLast: true }));
}

// ================================
// TAREA: WATCH (OBSERVAR CAMBIOS)
// ================================

function watchArchivos() {
  watch(paths.scssAll, css);
  watch(paths.js, javascript);
  watch(paths.imagenes, series(imagenes, versionWebp));
}

// ================================
// TAREAS AGRUPADAS
// ================================

// Build: compila todo y TERMINA
const build = series(css, javascript, imagenes, versionWebp);

// Dev: compila y se queda escuchando (WATCH)
const dev = series(build, watchArchivos);

// ================================
// EXPORTACIÓN DE TAREAS
// ================================

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.watchArchivos = watchArchivos;

exports.build = build;
exports.dev = dev;

// Default: modo dev
exports.default = dev;
