const browserSync = require('browser-sync').create()


const server = () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 4000,
    })
}

exports.browserSync = browserSync
exports.server = server