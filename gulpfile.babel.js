import gulp from 'gulp';
import sass from 'gulp-ruby-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import notify from 'gulp-notify';
import cache from 'gulp-cache';
import livereload from 'gulp-livereload';
import watch from 'gulp-watch';
import babel from 'gulp-babel';
import del from 'del';

gulp.task('styles', () => {
    sass('src/styles/**/*.scss', { style: 'expanded' })
  .pipe(autoprefixer('last 2 version'))
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(cssnano())
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', () => {
  gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', () => {
  del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('default', ['clean'], () => {
  gulp.start('styles', 'scripts');
});

gulp.task('watch', () => {

  // Watch .scss files
  watch('src/styles/**/*.scss', ['styles']).on('change', () => {
    gulp.run('default');
  });

  // Watch .js files
  watch('src/scripts/**/*.js', ['scripts']);

});