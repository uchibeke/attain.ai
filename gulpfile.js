'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var files = ['js/manifest.json', 'js/background.js', '*/*.png'];
var xpiName = 'attain.ai.xpi';

gulp.task('default', function() {
	gulp.src(files).pipe(zip(xpiName)).pipe(gulp.dest('.'));
});
