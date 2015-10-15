var gulp = require('gulp');
var markdown = require('gulp-markdown');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var pdf = require('gulp-html-pdf');

//compile all markdown files to html
gulp.task('markdown', function() {
    return gulp.src('markdown/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('html'));
});

gulp.task('concat', function () {
return gulp.src([
'html/head.html',
'html/header.html',
'html/main.html',
'html/foot.html'], {base: 'html/'})
        .pipe(concat('index.html'))
        .pipe(gulp.dest('dist'));
});

//convert sass to css, and inject into browser
gulp.task('sass', function () {
    return gulp.src("scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('build', ['markdown', 'concat', 'sass']);

//watch src dir for changes
gulp.task('watch', function() {

    //serve dist dir with browser sync
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('markdown/*', ['markdown']);
    gulp.watch('html/*.html', ['concat']);
    gulp.watch('scss/*', ['sass']);
    gulp.watch('dist/index.html', browserSync.reload);
});


gulp.task('default', ['build', 'watch']);
//note - to generate PDF, just select 'print' in Chrome, as print to pdf
