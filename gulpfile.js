const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  html: {
    src: '*.html'
  }
};

function styles() {
  return gulp
    .src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

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

function serve() {
  browserSync.init({
    server: { baseDir: './' }
  });
  gulp.watch(paths.scss.src, styles);
  gulp.watch(paths.js.src, scripts);
  gulp.watch(paths.html.src).on('change', browserSync.reload);
}

const build = gulp.parallel(styles, scripts);

exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.default = gulp.series(build, serve);
