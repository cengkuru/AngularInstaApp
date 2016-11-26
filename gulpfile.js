var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('imagemin');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-html-minifier');
var notify = require('gulp-notify');

var bases = {
    app: 'src/',
    build: 'build/',
};

var paths = {
    scripts: ['js/**/*.js'],
    styles: ['css/**/*.css'],
    html: ['index.html', '404.html'],
    images: ['images/**/*'],
    views: ['views/**/*'],
    extras: ['robots.txt', 'favicon.ico'],
};

// Delete the build directory
gulp.task('clean', function () {
    return gulp.src(bases.build, {read: false})
        .pipe(clean())
        .pipe(notify({ message: 'Build folder deleted' }));
});




// Auto prefix css
gulp.task('prefixCss', function () {
    gulp.src(bases.app+'css/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(bases.app+'css'))
        .pipe(notify({ message: 'prefixCss Task Complete' }));
});

// Copy styles.css.min to build
gulp.task('copyStylesCss', function () {
    gulp.src(bases.app+'css/styles.min.css')
        .pipe(gulp.dest(bases.build+'css'))
        .pipe(notify({ message: 'styles.min.css Copied To Build Folder' }));
});


// Delete the build directory
gulp.task('cleanImg', function () {
    return gulp.src(bases.build+'images/', {read: false})
        .pipe(clean())
        .pipe(notify({ message: 'Images Folder In Build Deleted' }));
});

// Copy images to build
gulp.task('copyImg',['cleanImg'], function () {
    gulp.src(bases.app+'images/**/*.{jpg,png}')
        .pipe(gulp.dest(bases.build+'images'))
        .pipe(notify({ message: 'Images Folder In Build Recreated' }));
});


// Concatenate js
gulp.task('concatJs', function () {
    // Source folder
    gulp.src([
            bases.app+'js/app.js',
            bases.app+'js/routes.js',

            bases.app+'js/controllers/MainCtrl.js',
            bases.app+'js/controllers/HomeCtrl.js',
            bases.app+'js/controllers/FeedCtrl.js',

            bases.app+'js/services/toastService.js',
            bases.app+'js/filters/orderByTimestampFilter.js'
        ])
        .pipe(concat('app.js'))
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(bases.build+'js/'))
        .pipe(notify({ message: 'Js Concatenation Task Completed' }));
})

// Uglify js
gulp.task('uglifyJs', function () {
    // Source folder
    gulp.src(bases.build+'js/app.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(bases.build+'js/'))
        .pipe(notify({ message: 'Uglify Js Task Completed' }));
})

// Concatenate Libs
gulp.task('concatLibs',function min () {

    return gulp.src(bases.app+'index.html')
        .pipe(useref())
        .pipe(gulp.dest(bases.build))
        .pipe(notify({ message: 'External Libs Concatenate completed' }));
})



// Minify views html
gulp.task('minifyViews', function() {
    gulp.src(bases.app+'views/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(bases.build+'views'))
        .pipe(notify({ message: 'Minify Views Task Complete' }));
});




// Watch for changes
gulp.task('watch', function () {
    //  index.html
    gulp.watch([bases.app+'index.html'], ['concatLibs','minifyViews'])

    //  css
    gulp.watch([bases.app+paths.styles], ['prefixCss','copyStylesCss'])

    //  views
    gulp.watch([bases.app+paths.views], ['minifyViews'])

    // Js
    gulp.watch([bases.app+paths.scripts], ['concatJs','uglifyJs'])

    // Images
    gulp.watch([bases.app+paths.images], ['copyImg'])




})


gulp.task('default', ['watch'])
