import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import browserSync from 'browser-sync';
import banr from 'banr';
import pkg from './package.json';

const reload = browserSync.reload;
const conf = {
  src: './src',
  dist: './dist'
};

gulp.task('scripts', () => {
  const pip = gulp.src(`${conf.src}/{,*/}*.js`);

  pip
    .pipe(
      babel().on('error', err => {
        console.error(`Error: ${err.message}`);
        pip.end();
      }))
    .pipe(gulp.dest('./.tmp'))
    .pipe(reload({
      stream: true
    }));

  return pip;
});

gulp.task('scripts:dist', () => {
  const pip = gulp.src(`${conf.src}/{,*/}*.js`);

  pip
    .pipe(
      babel().on('error', err => {
        console.error(`Error: ${err.message}`);
        pip.end();
      }))
    .pipe(uglify())
    .pipe(header(banr()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'));

  return pip;
});

gulp.task('views', () => {
  const pip = gulp.src(`${conf.src}/{,*/}*.html`);

  pip.pipe(reload({
    stream: true
  }));

  return pip;
});

gulp.task('browser-sync', () => {
  browserSync({
    options: {
      notify: false,
      background: true,
      watchOptions: {
        ignored: ''
      },
      files: [
        `${conf.src}/{,*/}*.js`,
        `${conf.src}/examples/*.html`
      ]
    },
    server: {
      baseDir: './examples',
      routes: {
        '/src': './.tmp'
      }
    }
  });
});

gulp.task('serve', [
  'scripts',
  'browser-sync'
], () => {
  gulp.watch(`${conf.src}/{,*/}*.js`, ['scripts']);
  gulp.watch(`${conf.src}/{,*/}*.html`, ['views']);
});

gulp.task('build', [
  'scripts:dist'
]);
