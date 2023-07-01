const { src, dest } = require('gulp')
const rename = require('gulp-rename')
const minCss = require('gulp-clean-css')
const { browserSync } = require('./server')
const sourceMaps = require('gulp-sourcemaps')
const autoPrefixer = require('gulp-autoprefixer')
const scss = require('gulp-sass')(require('sass'))


const scssToCss = () => {
    return src('src/scss/style.scss')
        .pipe(sourceMaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(autoPrefixer())
        .pipe(dest('dist/css/'))
        .pipe(minCss({compatibility: 'ie11'}))
        .pipe(rename({
            basename: 'style',
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(sourceMaps.write('.'))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream())
}

exports.scssToCss = scssToCss