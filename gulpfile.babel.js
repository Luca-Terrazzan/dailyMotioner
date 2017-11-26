"use strict";

import gulp from 'gulp';
import del from 'del';
import typescript from 'typescript';

const path = {
    src: './src',
    dist: './dist'
};

export const clean = () => del([path.dist]);

gulp.task('clean', () => {
    return gulp.src(path.dist)
        .pipe(del);
});

