const gulp         = require('gulp');
const gulpSass     = require('gulp-sass');
const sass         = require('sass');
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');
const rename       = require('gulp-rename');
const sourcemaps   = require('gulp-sourcemaps');
const browserSync  = require('browser-sync').create();

// ── Usa a API moderna do Dart Sass (sem DeprecationWarning) ──
const sassCompiler = gulpSass(sass);

// ── Paths ────────────────────────────────────────────────────
const paths = {
  scss: {
    src:   'src/scss/main.scss',
    watch: 'src/scss/**/*.scss',
    dest:  'dist/css'
  },
  js: {
    src:  'src/js/**/*.js',
    dest: 'dist/js'
  },
  html: {
    src: '*.html'
  }
};

// ── Compile SCSS → CSS minificado ────────────────────────────
function styles() {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(
      sassCompiler({ silenceDeprecations: ['legacy-js-api'] })
        .on('error', sassCompiler.logError)
    )
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// ── Bundle + minifica JS ─────────────────────────────────────
function scripts() {
  return gulp
    .src(paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// ── Copia index.html para dist/ (necessário para Vercel) ─────
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(gulp.dest('dist'));
}

// ── Servidor local com live reload ───────────────────────────
function serve() {
  browserSync.init({
    server: { baseDir: 'dist' }
  });
  gulp.watch(paths.scss.watch, styles);
  gulp.watch(paths.js.src, scripts);
  gulp.watch(paths.html.src, gulp.series(html, browserSync.reload));
}

// ── Tarefas exportadas ───────────────────────────────────────
const build = gulp.series(
  gulp.parallel(styles, scripts),
  html
);

exports.styles  = styles;
exports.scripts = scripts;
exports.html    = html;
exports.build   = build;
exports.default = gulp.series(build, serve);
