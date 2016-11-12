'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var files = ['manifest.json', './js/background.js', './js/analyzeText.js', '*/*.png', './node_modules/*'];
var xpiName = 'attain.ai.xpi';

gulp.task('default', function() {
	gulp.src(files).pipe(zip(xpiName)).pipe(gulp.dest('.'));
});
