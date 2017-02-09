/* jshint node: true */
/* jshint -W100 */
'use strict';


var gulp = require("gulp");
var babel = require("gulp-babel");
var browserSync = require('browser-sync');
var concat = require("gulp-concat");
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var postcss = require('gulp-postcss');
var notify = require("gulp-notify");
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var uglify = require('gulp-uglify');
var strip = require('gulp-strip-comments');
var stripCssComments = require('gulp-strip-css-comments');

var config = {
  sassPath: './src/scss',
  npmDir: './node_modules',
  bowerDir: './bower_components'
};
/*-- start copy all image
gulp.task('copy-font-awesome', function() {return gulp.src(config.npmDir + '/font-awesome/fonts/**.*') 
  .pipe(gulp.dest('./dist/fonts')); 
});
-- */
/*-- end copy all js --*/

gulp.task('compile-scss', function () {
  gulp.src('src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({includePaths: [
    'src/scss'
  ]}))
  .pipe(sass({outputStyle: 'nested'}) )
  .on("error", notify.onError(function (error) {
    return "Error: " + error.message;
  }))
  .pipe(postcss([
      require('autoprefixer')
  ]))
  .pipe(rename('all.css'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('compile-js', function() {
  return gulp.src('src/js/**/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('dist/js/app_lib'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["dist/css/*.css", "dist/js/*.js"], {
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('default',
  [
    'compile-scss',
    'compile-js',
    'browser-sync'
  ],
  function () {
    gulp.watch("src/scss/**/*.scss", ['compile-scss']).on('change', browserSync.reload);
    gulp.watch("src/js/**/*.js", ['compile-js']).on('change', browserSync.reload);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
  }
);
