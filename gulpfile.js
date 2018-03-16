// gulpプラグインの読みこみ
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

// ブラウザシンク起動
gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'docs/'
    },
    // http://localhost:9999/
    port: 9999
  });
});

// リロード
gulp.task('reload', function () {
  browserSync.reload();
});

// css作成
gulp.task('css', function () {
  gulp.src('docs/css/sass/base.scss')
    // scssのコンパイル
    .pipe($.sass({
      style: 'expanded'
    })).on('error', $.sass.logError)
    // autoprefix
    .pipe($.autoprefixer('last 2 versions'))
    .pipe(gulp.dest('docs/css/'))
    // ブラウザリロード
    .pipe(browserSync.reload({
      stream: true
    }));
});

//watch

gulp.task('watch', function () {
  gulp.watch('docs/css/sass/parts/*.scss', ['css']);
  gulp.watch('docs/js/*.js', ['reload']);
  gulp.watch('docs/*.html', ['reload']);
  gulp.watch('docs/', ['server']);
});

gulp.task('default', ['watch', 'server']);
