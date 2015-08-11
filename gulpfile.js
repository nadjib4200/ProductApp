var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var connect = require('gulp-connect');
var _ = require('lodash');
var gutil = require('gulp-util');
var through2 = require('through2');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var minimist = require('minimist');
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

var options = minimist(process.argv.slice(2));

/* On récupère le mode gulp build --env dev */
var env = options["env"] || "mock"; 
var port = options["port"] || 8080; 

/* Lecture du fichier de config*/
var cfg = require('./config.json');
var config = cfg[env];
var commonConf = cfg['common'];
/* Extension (override) de conf*/
config = _.extend(commonConf, config);

/* Scripts JS (correspond à app.js à embarquer) */
var jsFiles = config["jsFiles"];

/* Template HTML */
var templateFiles = config["templateFiles"];

/* CSS */
var cssFiles = config["cssFiles"];

/* Fichier Sources (JS)*/
var srcFiles = config["srcFiles"];

/* Fichier Libs de Bower */
var libsFiles = config["libsFiles"];

/* Fichier CSS à embarquer*/
var libCss = config["libCss"];


/* Pour compiler le template inde.html*/
var compileData = {
            jsFiles: jsFiles,
            cssFiles: cssFiles,
            libsFiles: _.map(libsFiles, function(file){ return file.replace('app/', '')}),
            srcFiles: srcFiles,
            libCss: libCss,
            isMock: env === 'mock'
        };

//console.log('Compile Data ', compileData);

/*
	Concaténer les fichier Js en un seul fichier
*/
gulp.task('clean', function() {
  return gulp.src('www', {read: false})
    	.pipe(clean());
});

/*
	lancement de web server local sur le port 8080
*/
gulp.task('server', function() {
  connect.server({
    root: 'www',
    port: port,
    livereload: false
  });
});


/*
	CUSTOM GULP : compilation de template index.html
*/
compileHtmlTemplate = function(data){
	return through2.obj(function(file, enc, cb) {
		var content =  file.contents;
		var compiled = _.template(content);
		var compiledContent = compiled(data);
		file.contents = new Buffer(compiledContent);
		cb(null, file);
	});
}

/*
	Construct Index.HTML à partir de template
*/
gulp.task('build:index-html', function() {
  return gulp.src('app/index.html')
    	.pipe(compileHtmlTemplate(compileData))
       .pipe(gulp.dest('www'));
});



/*
  Copy Fonts
*/
gulp.task('build:copyFonts', function() {
  return gulp.src("app/fonts/**", { "base" : "./app" })
      .pipe(gulp.dest('www'));
});

/*
  Copy Imgs
*/
gulp.task('build:copyImages', function() {
  return gulp.src("app/img/**", { "base" : "./app" })
      .pipe(gulp.dest('www'));
});

/*
	Copy les libs Bower et autres
*/
gulp.task('build:copyLibs', function() {
  return gulp.src(libsFiles, { "base" : "./app" })
  		.pipe(gulp.dest('www'));
});

/*
  Copy les libs Bower et autres
*/
console.log('libCss', libCss)
gulp.task('build:copyCssLibs', function() {
  return gulp.src(libCss, { "base" : "./app" })
      .pipe(gulp.dest('www'));
});


/* Copy des template HTML*/
gulp.task('build:copyTemplates', function() {
  return gulp.src(templateFiles, { "base" : "./app" })
  		.pipe(gulp.dest('www'))
      //.pipe(livereload({start: true}));
});

/*
	Concaténer les fichier Js en un seul fichier
*/
gulp.task('build:concat', function() {
  return gulp.src(srcFiles)
    .pipe(concat('app.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('www'));
});

/*
	génération de fichier CSS à partir de LESS
*/
gulp.task('build:sass', function () {
	return gulp.src('app/sass/app.scss')
	  .pipe(sass().on('error', sass.logError))
	  .pipe(gulp.dest('www'));
});

/* Copy de bootconfig.json */
gulp.task('build:bootconfig', function() {
    return gulp.src('app/bootconfig.json')
    .pipe(gulp.dest('www'));
});

/* Copy des template HTML*/
gulp.task('build:reload', function() {
  //force reload after 1s
  setTimeout(function(){
    console.log('reload livereload')
    livereload.reload();
  }, 1000);
  return gulp.src("www")
});

/*
	Watch  des changement et rebuild en conséquence
*/
gulp.task('watch', function() {
	  livereload.listen();
  	gulp.watch("app/**/*.*", ['build']);
});

/* Main TASK */

gulp.task('build', function(callback) {
  runSequence("build:sass",
              "build:concat", 
              "build:copyLibs",
              "build:copyCssLibs",
              "build:copyFonts",
              "build:copyImages",
              "build:copyTemplates",
              "build:index-html",
              "build:bootconfig",
              "build:reload",
              callback);
});



gulp.task('cordova:run', shell.task([
  'cordova run'
]));


gulp.task('android', function(callback) {
  runSequence("build",
              "cordova:run", 
              callback);
});