// Load Gulp and all the plugins
var pkg     = require('./package.json'),
dateFormat  = require('dateformat'),
requireDir  = require('require-dir'),
gulp        = require('gulp'),
autoprefix  = require('gulp-autoprefixer'),
concat      = require('gulp-concat'),
cssnano     = require('gulp-cssnano'),
filter      = require('gulp-filter'),
header      = require('gulp-header'),
jshint      = require('gulp-jshint'),
notify      = require('gulp-notify'),
plumber     = require('gulp-plumber'),
rename      = require('gulp-rename'),
sass        = require('gulp-sass'),
sourcemaps  = require('gulp-sourcemaps'),
uglify      = require('gulp-uglify'),
babel 		= require("gulp-babel");

// Set the banner
var now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss Z"),
banner  = '/*!\n'+
		  ' * <%= pkg.name %>\n'+
		  ' * Build date: '+ now +'\n'+
		  ' */\n';

// Hold the name of the last task to run, in case of error
var taskName;

var handleError = function(err) {
	var file = err.file;
	var line = err.line;

	if(typeof err.file === 'undefined') {
		file = err.fileName;
	}

	if(typeof err.line === 'undefined') {
		line = err.lineNumber;
	}

	var splitErrMessage  = err.message.split("\n"),
		errMessageLength = splitErrMessage.length,
		message          =
			"Error running '" + taskName + "' task." +
			"\n\t   File: " + file +
			"\n\t   Line: " + line +
			"\n\t   Message: " + splitErrMessage[0]
	;

	// Some errors have a second part
	if(typeof splitErrMessage[1] !== 'undefined') {
		message += "\n\t   " + splitErrMessage[1];
	}

	// Some have even more (missing mixin for example where it'll privide a backtrace)
	if(errMessageLength > 2) {
		splitErrMessage.forEach(function(el, i) {
			if(i > 1) {
				message += "\n\t\t" + splitErrMessage[i].trim();
			}
		});
	}

	return notify().write(message);
};

// JS hint task: Runs JSHint using the options in the .jshintrc file
gulp.task('jshint', function() {
	gulp.src('theme/js/src/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(notify(function (file) {
			if (file.jshint.success) {
				return 'JSHint: ' + file.relative + ' (complete).';
			} else {
				return 'JSHint: ' + file.relative + ' (' + file.jshint.results.length + ' errors).';
			}
		}));
});

// Scripts task: Concat, minify & generate sourcemaps
gulp.task('scripts', function() {
	// this.seq is an array containing the tasks that have run, we want the last one
	taskName = this.seq.pop();

	gulp.src('theme/js/src/*.js')
		.pipe(plumber({errorHandler: handleError}))
		.pipe(sourcemaps.init())
			.pipe(concat('script.js'))
			.pipe(header(banner, { pkg: pkg } ))
			.pipe(gulp.dest('theme/js/'))
			.pipe(rename('script.min.js'))
			.pipe(uglify())
			.pipe(header(banner, { pkg: pkg } ))
		.pipe(sourcemaps.write('maps', { includeContent: false, sourceRoot: '/theme/js/src' }))
		.pipe(gulp.dest('theme/js/'))
		.pipe(filter('*.js')) // Filter stream so we only get notifications and reloads from JS files, not the maps
		.pipe(notify(function (file) {
			return 'Scripts: ' + file.relative + ' generated.';
		}));
});

// Plugin scripts task: Concat JS files for plugins
// gulp.task('plugin-scripts', function() {
// 	gulp.src('theme/js/plugins/*.js')
// 		.pipe(concat('plugins.min.js'))
// 		.pipe(header(banner, { pkg: pkg } ))
// 		.pipe(gulp.dest('theme/js/'))
// 		.pipe(notify(function (file) {
// 			return 'Plugin Scripts: ' + file.relative + ' generated.';
// 		}));
// });

// Styles task: Compile Sass, add prefixes and minify
gulp.task('styles', function() {
	// this.seq is an array containing the tasks that have run, we want the last one
	taskName = this.seq.pop();

	gulp.src('theme/css/**/*.scss')
		.pipe(plumber({errorHandler: handleError}))
		.pipe(sourcemaps.init())
			.pipe(sass({ outputStyle: 'expanded' }))
			.pipe(autoprefix())
			.pipe(gulp.dest('theme/css/'))
			.pipe(rename({ suffix: ".min" })) // Rename the generated CSS file to add the .min suffix
			.pipe(cssnano())
			.pipe(header(banner, { pkg: pkg } ))
		.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
		.pipe(gulp.dest('theme/css/'))
		.pipe(filter('*.css')) // Filter stream so we only get notifications and injections from CSS files, not the maps & so we don't minify the map file
		.pipe(notify(function (file) {
			return 'Styles: ' + file.relative + ' generated.';
		}));
});

// Plugin styles task: concatenates & minifies CSS files for plugins
gulp.task('plugin-styles', function() {
	gulp.src('theme/css/plugins/*.css')
		.pipe(concat('plugins.min.css'))
		.pipe(cssnano())
		.pipe(header(banner, { pkg: pkg } ))
		.pipe(gulp.dest('theme/css/'))
		.pipe(notify(function (file) {
			return 'Plugin Styles: ' + file.relative + ' generated.';
		}));
});


gulp.task("babel", function(){
    gulp.src("theme/js/src/script.jsx")
    	.pipe(babel({plugins: ['transform-react-jsx']}))
    	.pipe(gulp.dest("theme/js/"))
    	.pipe(notify(function (file) {
			return 'JSX: ' + file.relative + ' generated.';
		}));
});


// Standard watch task
gulp.task('watch', function() {
	gulp.watch('theme/js/src/*.jsx', ['babel']);
	// gulp.watch('theme/js/plugins/*.js', ['plugin-scripts']);
	gulp.watch('theme/css/**/*.scss', ['styles']);
	gulp.watch('theme/css/plugins/*.css', ['plugin-styles']);
});

// Default task: runs tasks immediately and continues watching for changes
gulp.task('default', ['jshint', 'scripts', 'plugin-scripts', 'styles', 'plugin-styles', 'watch']);



