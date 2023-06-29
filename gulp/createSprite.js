const { src, dest } = require('gulp')
const rename = require('gulp-rename')
const svgSprite = require('gulp-svg-sprite')



const createSprite = () => {
    return src('dist/images/svg/icon-*.svg')
        .pipe(svgSprite({
            mode: {
                symbol: {
                    inline: true
                }
            }
        }))
        .pipe(rename({
            basename: 'sprite',
            extname: '.svg'
        }))
        .pipe(dest('dist/images/svg/'))
}

exports.createSprite = createSprite