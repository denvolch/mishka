const { src, dest } = require('gulp')
const ttfToWoff2 = require('gulp-ttf2woff2')



const convertFonts = () => {
    return src('src/fonts/*.ttf')
        .pipe(ttfToWoff2())
        .pipe(dest('dist/fonts/'))
}

exports.convertFonts = convertFonts