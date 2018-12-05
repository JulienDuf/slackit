const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");
const child = require("child_process");

const tsProject = ts.createProject("tsconfig.json");

let node = null;

gulp.task("build", function() {
    return tsProject
        .src()
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(tsProject())
        .js.pipe(sourcemaps.write())
        .pipe(gulp.dest("build"));
});

gulp.task("lint", function() {
    return tsProject
        .src()
        .pipe(tslint({ formatter: "stylish" }))
        .pipe(tslint.report({ summarizeFailureOutput: true }));
});

gulp.task("start", function(done) {
    if (!!node) {
        node.kill();
    }

    node = child.spawn("node", ["build/src/server.js"], { stdio: "inherit" });
    node.on("close", function(code) {
        if (code === 8) {
            gulp.log("Error detected, waiting for changes...");
        }
    });

    done();
});

gulp.task("default", gulp.series("build", "lint", "copy"));

gulp.task("dev", gulp.series("build", "copy"));

gulp.task("watch", function() {
    gulp.watch(["./src/**/*.ts"], { ignoreInitial: false }, gulp.series("default", "start"));
});

process.on("exit", function() {
    if (!!node) {
        node.kill();
    }
});
