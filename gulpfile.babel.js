const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const watchify = require('watchify');
const exorcist = require('exorcist');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

// Input file.
watchify.args.debug = true;
let bundler = browserify('app/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'app'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

  gutil.log('Compiling JS...');

  return bundler.bundle()
    .on('error', function(err) {
      gutil.log(err.message);
      browserSync.notify('Browserify Error!');
      this.emit('end');
    })
    .pipe(exorcist('public/js/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', ['lint', 'styles'], () => {
  return bundle();
});

/**
 * First bundle, then serve from the public directory
 */
gulp.task('default', ['bundle'], () => {
  browserSync.init({
    server: 'public',
    notify: false
  });
});

gulp.task('styles', () => {
  return gulp.src('app/stylesheets/*.scss')
    // .pipe($.plumber())
    // .pipe($.sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    // .pipe($.autoprefixer({browsers: ['last 1 version']}))
    // .pipe($.uncss({
    //   html: ['app/*.html']
    // }))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(bundle());
});

gulp.task('lint', () => {
  gulp
    .src(['gulpfile.babel.js', 'app/**/*.js', 'server/*.js'])
});

gulp.task('watch', ['default'], () => {
  gulp.watch('app/stylesheets/**/*.scss', ['styles']);
  gulp.watch('app/**/*.js', ['bundle']);
  gulp.watch('public/**/*.html', ['bundle']);
});
