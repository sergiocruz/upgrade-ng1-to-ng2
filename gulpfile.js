const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const watchify = require('watchify');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const fs = require('fs');

// Fonts that need to be copied.
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
const bundler = browserify('app/app.ts', watchify.args);

// TypeScript plugin
bundler.plugin(tsify);

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
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify({compress:{drop_debugger: false}}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', ['create-config', 'styles'], () => {
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
  gulp.watch('app/**/*.{js,ts}', ['bundle']);
  gulp.watch('public/**/*.html', ['bundle']);
});

gulp.task('create-config', (done) => {

  const config = JSON.stringify({
    offlineMode: !!parseInt(process.env.OFFLINE)
  }, null, 2);

  fs.writeFile('app/config/config.json', config, done);
});
