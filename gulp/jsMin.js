const { src, dest } = require('gulp')
const uglify = require('gulp-uglify')
const { browserSync } = require('./server')


const jsMin = () => {
    return src('src/js/*.js')
        .pipe(dest('dist/js/')) 
        .pipe(browserSync.stream())
}

exports.jsMin = jsMin