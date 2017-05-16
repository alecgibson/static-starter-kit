var gulp = require('gulp');
var pump = require('pump');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

gulp.task('clean', function(callback) {
    pump([
            gulp.src('dist', {read: false}),
            clean()
        ],
        callback
    );
});

gulp.task('nunjucks', function(callback) {
    pump([
            gulp.src('src/pages/**/*.+(html|nunjucks)'),
            nunjucksRender({
                path: ['src/templates'] // String or Array
            }),
            gulp.dest('dist'),
            connect.reload()
        ],
        callback
    );
});

gulp.task('sass', function(callback) {
    pump([
            gulp.src('src/assets/style/application.scss'),
            sass({outputStyle: 'compressed'}).on('error', sass.logError),
            gulp.dest('dist/assets/style'),
            connect.reload()
        ],
        callback
    );
});

gulp.task('javascript', function(callback) {
    pump([
            gulp.src([
                'src/assets/javascript/jquery.min.js',
                'src/pages/home.js'
            ]),
            concat('application.min.js'),
            uglify(),
            gulp.dest('dist/assets/javascript'),
            connect.reload()
        ],
        callback
    );
});

gulp.task('copy', function(callback) {
    pump([
            gulp.src([
                'src/assets/**/*',
                '!src/assets/**/*.scss',
                '!src/assets/**/*.js'
            ]),
            gulp.dest('dist/assets')
        ],
        callback
    );
});

gulp.task('connect', function() {
   connect.server({
       root: './dist',
       livereload: true
   });
});

gulp.task('default', function(callback) {
    runSequence(
        'clean',
        ['nunjucks', 'copy', 'sass', 'javascript'],
        callback
    );
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.+(html|nunjucks)', ['nunjucks']);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['javascript']);
});

gulp.task('run', function(callback) {
   runSequence(
       'default',
       'watch',
       'connect',
       callback
   );
});
