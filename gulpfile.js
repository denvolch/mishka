const { browserSync, server } = require('./gulp/server')
const { convertFonts } = require('./gulp/convertFonts')
const { createSprite } = require('./gulp/createSprite')
const { optimImages } = require('./gulp/optimImages')
const { scssToCss } = require('./gulp/scssToCss')
const { optimHtml } = require('./gulp/optimHtml')
const { jsMin } = require('./gulp/jsMin')

const { watch, series, parallel } = require('gulp')


const watchDev = () => {
    server()

    watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', optimImages)
    watch('src/*.html', optimHtml)
    watch('src/js/*.js', jsMin)
    watch('src/scss/**/*.scss', scssToCss)
}

const build = series(
    jsMin,
    convertFonts,
    optimImages,
    optimHtml,
    scssToCss,
    createSprite,
)

exports.build = build
exports.watch = watchDev

exports.default = parallel(
    jsMin,
    optimHtml,
    scssToCss,
    watchDev
)