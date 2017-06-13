var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task("node", function() {
    nodemon({
        script: 'app.js'
    })
});

gulp.task('server', ["node"], function() {
    var files = [
        'server/*.*',
        'mockData/*.*',
        'config/*.*',
    ];

    browserSync.init(files, {
        proxy: 'http://localhost:2000/test.html',
        // browser: 'chrome',
        notify: false,
        port: 2001
    });

    gulp.watch(files).on("change", reload);
});
