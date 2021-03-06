var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat');

gulp.task('browser-sync', ['styles', 'scripts'], function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('styles', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer({browsers: ['last 5 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src([
        './app/libs/modernizr/modernizr.js',
        './app/libs/jquery/jquery-1.11.2.min.js',
        './app/libs/waypoints/waypoints.min.js',
        './app/libs/animate/animate-css.js',
        './app/libs/plugins-scroll/plugins-scroll.js',
        './app/libs/superfish/dist/js/superfish.min.js',
        './app/libs/owl.carousel/dist/owl.carousel.min.js',
        './app/libs/equalHeights/equalheights.js',
        './app/libs/jQuery.mmenu/dist/js/jquery.mmenu.all.min.js',
        './app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
        .pipe(concat('libs.js'))
        //.pipe(uglify()) //Minify libs.js
        .pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
    gulp.watch('app/sass/*.scss', ['styles']).on('change', browserSync.reload);
    gulp.watch('app/libs/**/*.js', ['scripts']).on('change', browserSync.reload);
    gulp.watch('app/js/*.js').on("change", browserSync.reload);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);
