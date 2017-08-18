"use strict";

let gulp = require('gulp');
let clean = require('gulp-clean');
let browserSync = require('browser-sync').create();
let webpackStream = require('webpack-stream');
let webpack2 = require('webpack');
let htmlLoader = require('html-loader');

gulp.task('clean',()=>{
  gulp.src('dist/*', {read:false})
    .pipe(clean());
});

gulp.task('copy',['clean'], ()=>{
  return gulp.src('components/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack',['copy'], ()=>{
  return gulp.src('components/main.js')
    .pipe(webpackStream({
      module:{
        rules:[{
          test:/\.html$/,
          use: [{
            loader:'html-loader',
            options:{
              minimize:true
            }
          }],
        }]
      },
      output:{
        filename:'main.js'
      }
      
    }, webpack2))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['webpack'], ()=>{
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  })
  gulp.watch('components/').on('change', ()=>{
    console.log('reloading');
    browserSync.reload
  });
});