
import gulp from 'gulp'
import babel from 'gulp-babel'
import postcss from 'gulp-postcss'
import replace from 'gulp-replace'
import htmlmin from 'gulp-htmlmin'
import terser from 'gulp-terser'
import postcssimport from 'postcss-import'
import mixins from 'postcss-mixins'
import nested from 'postcss-nested'
import simplevars from 'postcss-simple-vars'
import minmax from 'postcss-media-minmax'
import autoprefixer from 'autoprefixer'
import csso from 'postcss-csso'
import sync from 'browser-sync'

// html
export function html() {
    console.log('gulp.src', gulp.src('src/*.html'));
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream())
}

// styles
export function styles() {
    return gulp.src('src/index.css')
        .pipe(postcss([
            mixins,
            nested,
            simplevars,
            postcssimport,
            minmax,
            autoprefixer,
            csso,
        ]))
        .pipe(replace(/\.\.\//g, ''))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream())
}

// scripts
export function scripts() {
    return gulp.src('src/index.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream())
}

// copy
export function copy() {
    return gulp.src([
            'src/fonts/**/*',
            'src/images/**/*',
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }))
}

// paths
export function paths() {
    return gulp.src('dist/*.html')
        .pipe(replace(
            /(<link rel="stylesheet" href=")styles\/(index.css">)/, '$1$2'
        ))
        .pipe(replace(
            /(<script src=")scripts\/(index.js">)/, '$1$2'
        ))
        .pipe(gulp.dest('dist'))
}

// server
export function server() {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    })
}

// watcher
export function watch() {
    gulp.watch('src/*.html', gulp.series(html, paths))
    gulp.watch('src/**/*.css', gulp.series(styles))
    gulp.watch('src/**/*.js', gulp.series(scripts))
    gulp.watch([
        'src/fonts/**/*',
        'src/images/**/*',
    ], gulp.series(copy))
}

// default
export default gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
    ),
    paths,
    gulp.parallel(
        watch,
        server,
    ),
)
