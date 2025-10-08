import gulp from 'gulp';
import insert from 'gulp-insert';
import pkg from './package.json';

gulp.task('add-header', function() {
  return gulp.src('dist/*.js') 
    .pipe(insert.prepend(`/* ${pkg.name} - v${pkg.version} */\n`))
    .pipe(gulp.dest('dist'));
});


