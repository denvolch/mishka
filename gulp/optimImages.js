const webp = require('gulp-webp')
const { src, dest } = require('gulp')
const imagemin = require('gulp-imagemin')


const optimImages = () => {
    return src('src/images/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({
                plugins: [
                    { optimizationLevel: 3 },
                    { progessive: true },
                    { interlaced: true },
                    { removeViewBox: false },
                    { cleanupIDs: true },
                    { removeUnknownsAndDefaults: 
                        {
                            keepDataAttrs: false
                        }
                    }
                ]
            })
        ]))
        .pipe(dest('dist/images/'))
        .pipe(src('dist/images/**/*.{jpg,jpeg,png,gif}'))
        .pipe(webp())
        .pipe(dest('dist/images/'))

}
exports.optimImages = optimImages