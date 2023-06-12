const { src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const csso = require('gulp-csso')

function sassToCss() {
    return src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('dest/css/'))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(rename('style.min.css'))
        .pipe(dest('dest/css/'))
}

function watchChanges() {
    watch('src/scss/**/*.scss', sassToCss)
}

exports.default = parallel(sassToCss, watchChanges)