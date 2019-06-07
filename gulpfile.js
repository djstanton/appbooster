var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var spritesmith = require('gulp.spritesmith');
var svgSprite = require('gulp-svg-sprite');
var svgConfig = {
        shape: {
            dimension: { // Set maximum dimensions
                maxWidth: 400,
                maxHeight: 400
            },
            spacing: { // Add padding
                padding: 10
            },
        },
        mode: {
            css: {
                render: {
                    css: true
                }
            }
        }
    };

gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        padding: 5,
        imgPath: '../i/sprite.png',
        cssOpts: {
            cssClass: function (item) {
                return '.rating-fame-alley-i.' + item.name;
            }
        }
    }));

    spriteData.img.pipe(gulp.dest('./i/'));

    // Deliver CSS to `./` to be imported by `index.scss`
    spriteData.css.
    pipe(gulp.dest('./src'));
});

var sassInput = ['./src/**/*.{sass,scss}'];
var sassOptions = {
    errLogToConsole: true,
    includePaths: require('node-normalize-scss').includePaths
};

gulp.task('sass', function(done) {
    return gulp.src(sassInput)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'Opera > 12', 'IE >= 10'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));;
});

gulp.task('svgSptite', function() {
    return gulp.src('**/*.svg', { cwd: 'src/assets/svg' })
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest('src/assets/sprite'))
        .pipe(gulp.dest('assets/sprite'));
});


gulp.task('watch', function() {
    gulp.watch(sassInput,['sass', 'sprite']);
});

gulp.task('default', function() {
    runSequence(['sass', 'watch', 'sprite']);
});