const { src, dest, watch, parallel, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const imagemin = require('gulp-imagemin')
const sprite = require('gulp-svgstore')
const rename = require('gulp-rename')
const webp = require('gulp-webp')
const csso = require('gulp-csso')

function sassToCss() {
    return src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('dist/css/'))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(rename('style.min.css'))
        .pipe(dest('dist/css/'))
}

const imageOptimize = () => {
    console.log('start')
    return src('src/images/**/*.{jpg,jpeg,png,svg}')
        .pipe(imagemin([
            imagemin.mozjpeg({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({plugins: [
                {
                    name: 'removeViewBox',
                    active: true
                },
                {
                    name: 'cleanupIDs',
                    active: false
                }
            ]})
        ]))
        .pipe(dest('src/images/'))
}

const convertWebp = () => {
    console.log('webp start')
    return src('src/images/**/*.{jpg,jpeg,png}')
        .pipe(webp({quality: 90}))
        .pipe(dest('dist/images/'))
}

const spriteCreate = () => {
    console.log('sprite start')
    return src('src/images/**/icon-*.svg')
        .pipe(sprite())
        .pipe(dest('dist/images/'))
}

const imgHandling = async () => {
    await imageOptimize()
    await convertWebp()
    return spriteCreate()
}


function watchChanges() {
    watch('src/scss/**/*.scss', sassToCss)
}
exports.imgOptim = imgHandling

exports.default = parallel(sassToCss, watchChanges)