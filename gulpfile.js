const { src, dest, watch, parallel, series } = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const ttf2woff2 = require('gulp-ttf2woff2')
const imagemin = require('gulp-imagemin')
const fonter = require('gulp-fonter-fix')
const sprite = require('gulp-svgstore')
const rename = require('gulp-rename')
const webp = require('gulp-webp')
const csso = require('gulp-csso')


const htmlOptim = () => {
    return src('src/*.html')
        .pipe(dest('dist/'))
}
const sassToCss = () => {
    return src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('dist/css/'))
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(rename('style.min.css'))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream())
}

const fontToTTF = () => {
    return src('src/fonts/*.{otf, woff}')
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest('src/fonts/'))
}

const ttfToWoff2= () => {
    return src('src/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts'))
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
        .pipe(dest('dist/images/'))
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

const serve = () => {
    browserSync.init({
        server: "./dist"
    })

    watch('src/*.html', htmlOptim).on('change', browserSync.reload)
    watch('src/scss/**/*.scss', sassToCss)
}

exports.fontsConvert = series(fontToTTF, ttfToWoff2)
exports.imgOptim = imgHandling

exports.default = parallel(htmlOptim, sassToCss, serve)