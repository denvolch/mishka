const { src, dest }  = require('gulp')


const optimHtml = () => {
    return src('src/*.html')
        .pipe(dest('dist/'))
}

exports.optimHtml = optimHtml