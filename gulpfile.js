var gulp = require("gulp");
var typescriptBuilder = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var rename = require("gulp-rename");
var mocha = require("gulp-mocha");

var tsConfig = typescriptBuilder.createProject("./tsconfig.json");

gulp.task("build", ["clean", "copyView"], function() {
    return tsConfig.src()
        .pipe(sourcemaps.init())
        .pipe(typescriptBuilder(tsConfig)).js
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace("src", "")
        }))
        .pipe(sourcemaps.write("./", 
        { 
            includeContent: false, 
            sourceRoot: function (file) {
                var subDirectories = (file.relative.match(/\\/g) || []).length;
                
                var relativePath = "../";
                
                for (var i = 0; i < subDirectories; i++) {
                    relativePath += "../";               
                }
                
                return relativePath;
            } 
        }))
        .pipe(gulp.dest("web/"));
});

gulp.task("copyView", function(){
    gulp.src("src/views/**/*.handlebars")
    .pipe(gulp.dest("web/views"))
});

gulp.task("clean", function(){
    return del["web/**/*"];
});
 
var tsConfigTests = typescriptBuilder.createProject("tests/tsconfig.json");
gulp.task("buildTests", function () {
    // pipe in all necessary files
    return tsConfigTests.src()
        .pipe(typescriptBuilder(tsConfigTests)).js 
        .pipe(gulp.dest("tests"));
});

gulp.task("test", ["buildTests"], function () {
    return gulp.src("./tests/*.js", { read: false }) 
        .pipe(mocha());
});

gulp.task("watch", function(){
    gulp.watch("src/**/*.ts", ["build"]);
});