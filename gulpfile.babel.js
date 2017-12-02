"use strict";

import gulp from 'gulp';
import del from 'del';
import ts from 'gulp-typescript';
import exec from 'child_process';
import { getTrailingCommentRanges } from 'typescript';

const tsProject = ts.createProject('./tsconfig.json');

const path = {
    src: './src',
    dist: './dist',
    login: './dist' + '/login.js'
};


gulp.task('clean', () => {
    del([path.dist + '/*']);
});

gulp.task(
    'build', () => {
        console.log('Building script...');
        tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest(path.dist));
    }
);

gulp.task('run', ['build'],() => {
    console.log('Executing script...');
    exec.exec('node ' + path.login + ' > ' + path.dist + '/result.json');
});
