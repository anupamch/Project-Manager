var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
// requires browserify and vinyl-source-stream
var browserify = require('browserify')
var source = require('vinyl-source-stream')


gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 8080,
		host: 'localhost',
		fallback: 'public/index.html'
    })
})

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('./app/app.js')
        // bundles it and creates a file called main.js
        .bundle().on('error', function(err){
        	console.log(err)
        	
        })
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
})

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify'])
})

gulp.task('default', ['connect', 'watch'])