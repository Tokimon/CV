'use strict';

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var stylus = require('gulp-stylus');
var yaml = require('yamljs');
var _ = require('lodash');

var skills = yaml.load('src/content/skills.yaml');

// TODO: group skills by rating.

_.forEach(skills, function( skill, area ) {
  var arr = [];

  _.forEach(skill, function(rating, name) {
    var ratingObj = _.find(arr, { rating: rating });
    if( !ratingObj ) { return arr.push({ text: name, rating: rating }); }
    ratingObj.text += ', '+ name;
  });

  skills[area] = arr.sort(function(a, b) { return b.rating - a.rating; });
});

var content = {
  skills : skills,
  languages : [
    { cn: 'flag-dk', rating: 5 },
    { cn: 'flag-uk', rating: 5 },
    { cn: 'flag-fr', rating: 3 }
  ]
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
