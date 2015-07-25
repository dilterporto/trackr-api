var gulp = require('gulp')
  , assets = require('gulp-bower-assets');

var config = {
  prefix: true
};

gulp.task('assets', function(){
  return gulp.src('assets.json')
    .pipe(assets(config))
    .pipe(gulp.dest('client/js/lib'));
});
