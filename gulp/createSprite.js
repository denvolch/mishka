const { src, dest } = require('gulp')
const rename = require('gulp-rename')
const svgSprite = require('gulp-svg-sprite')

const createSprite = () => {
    return src('dist/images/**/*.svg')
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: '',
                    inline: true
                }
            },
            svg: {
                xmlDeclaration: false,
                doctypeDeclaration: false,
                namespaceIDs: false,
                namespaceIDPrefix: '',
                namespaceClassnames: false,
                dimensionAttributes: true
            },
        }))
        .pipe(rename({
            basename: 'sprite',
            extname: '.svg'
        }))
        .pipe(dest('dist/images/'))
}

exports.createSprite = createSprite