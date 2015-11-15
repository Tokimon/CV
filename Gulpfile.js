'use strict';

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var stylus = require('gulp-stylus');
var yaml = require('yamljs');

var content = {
  skills : yaml.load('src/content/skills.yaml')
};

gulp.task('html', function () {
  nunjucksRender.nunjucks.configure(['./src/modules/'], {watch: false});
  return gulp.src('src/modules/index/index.html')
      .pipe(nunjucksRender(content))
      .pipe(gulp.dest('./'));
});

gulp.task('css', function() {
  return gulp.src('src/modules/index/index.styl')
      .pipe(stylus())
      .pipe(gulp.dest('./'));
});

gulp.task('js', function() {
  return gulp.src('src/modules/index/index.js')
      .pipe(gulp.dest('./'));
});

gulp.task('default', ['html', 'css', 'js']);
