var gulp = require("gulp");
var typescriptBuilder = require("gulp-typescript");
var flatten = require("gulp-flatten");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");

var tsConfig = typescriptBuilder.createProject("./tsconfig.json");

gulp.task("build", ["clean", "copyView"], function() {
    return tsConfig.src()
        .pipe(sourcemaps.init())
        .pipe(typescriptBuilder(tsConfig)).js
        .pipe(flatten({ newPath: "" }))
        .pipe(sourcemaps.write("./", { includeContent: false, sourceRoot: "../" }))
        .pipe(gulp.dest("web/"));
});

gulp.task("copyView", function(){
    gulp.src("src/views/**/*.handlebars")
    .pipe(gulp.dest("web/views"))
});

gulp.task("clean", function(){
    return del["web/**/*"];
})

gulp.task("watch", function(){
    gulp.watch("src/**/*.ts", ["build"]);
});