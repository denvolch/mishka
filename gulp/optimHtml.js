const { src, dest }  = require('gulp')
const htmlmin = require('gulp-htmlmin')
const { browserSync } = require('./server')



const optimHtml = () => {
    return src('src/*.html')
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'))
        .pipe(browserSync.stream())
}

exports.optimHtml = optimHtml