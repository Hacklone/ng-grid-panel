var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('default', ['build']);

gulp.task('dev', ['build', 'watch']);

gulp.task('build', ['build-js', 'build-less']);

gulp.task('build-js', function() {
    return gulp.src('src/ng-grid-panel.js')
        .pipe(ngAnnotate({
            add: true,
            single_quotes: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(rename('ng-grid-panel.min.js'))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('./'));

});

gulp.task('build-less', function() {
    return gulp.src('src/ng-grid-panel.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./'))
        .pipe(rename('ng-grid-panel.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./'));

});

gulp.task('watch', function() {
    gulp.watch('src/ng-grid-panel.less', ['build-less']);
    gulp.watch('src/ng-grid-panel.js', ['build-js']);
});