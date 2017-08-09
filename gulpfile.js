"use strict";

let gulp = require('gulp');
let browserSync = require('browser-sync').create();

gulp.task('watch', ()=>{
  gulp.watch('components');
});

gulp.task('default', ()=>{
  browserSync.init({
    server: {
      baseDir: "./components"
    }
  })
});