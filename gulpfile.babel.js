const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const watchify = require('watchify');
const exorcist = require('exorcist');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// Fonts that need to be copied
const fonts = [
  {
    from: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
    to: 'public/assets/fonts/bootstrap'
  },
  {
    from: 'node_modules/font-awesome/fonts/*',
    to: 'public/assets/fonts/font-awesome'
  },
  {
    from: 'app/stylesheets/weather-icons/font/*',
    to: 'public/assets/fonts/weather-icons'
  },
];

// Input file
watchify.args.debug = true;
const bundler = browserify('app/app.js', watchify.args);

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
    .pipe(exorcist('public/assets/js/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', ['styles'], () => {
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

gulp.task('styles', ['copy-fonts'], () => {
  return gulp.src('app/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 1 version']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/stylesheets'))
    .pipe(browserSync.stream());
});

gulp.task('copy-fonts', () => {
  fonts.forEach(
    (copy) => gulp.src(copy.from).pipe(gulp.dest(copy.to))
  )
})

gulp.task('watch', ['default'], () => {
  gulp.watch('app/stylesheets/**/*.scss', ['styles']);
  gulp.watch('app/**/*.js', ['bundle']);
  gulp.watch('public/**/*.html', ['bundle']);
});
