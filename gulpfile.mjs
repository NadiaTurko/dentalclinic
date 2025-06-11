import gulp from "gulp";
import concat from "gulp-concat";
import cleanCSS from "gulp-clean-css";
import uglify from "gulp-uglify";
import htmlmin from "gulp-htmlmin";
import connect from "gulp-connect";
import { deleteAsync } from "del";
import webp from "gulp-webp";
import gulpIf from "gulp-if";
import through2 from "through2";

const paths = {
  html: "src/*.html",
  styles: "src/styles/*.css",
  scripts: "src/script/*.js",
  images: "src/images/**/*",
  dist: "docs/",
};

export const clean = () => deleteAsync([paths.dist]);

export const html = () =>
  gulp
    .src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.dist))
    .pipe(connect.reload());

export const styles = () =>
  gulp
    .src([
      "src/styles/reset.css",
      "src/styles/intelPhone.css",
      "src/styles/style.css",
      "src/styles/aboutstyle.css",
      "src/styles/teamstyle.css",
      "src/styles/servicesstyle.css",
      "src/styles/blogstyle.css",
    ])
    .pipe(concat("main.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${paths.dist}/styles`))
    .pipe(connect.reload());

export const scripts = () =>
  gulp
    .src([
      "src/script/jquery-3.6.0.min.js",
      "src/script/swipers.js",
      "src/script/preloader.js",
      "src/script/services-background.js",
      "src/script/sendForm.js",
      "src/script/script.js",
    ])
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.dist}/script`))
    .pipe(connect.reload());

const isJpgPng = (file) =>
  file.extname === ".jpg" ||
  file.extname === ".jpeg" ||
  file.extname === ".png";

export const images = () =>
  gulp
    .src(paths.images)
    .pipe(gulp.dest(`${paths.dist}/images`))
    .pipe(gulpIf(isJpgPng, webp()))
    .pipe(
      gulpIf(
        isJpgPng,
        through2.obj((file, _, cb) => {
          console.log("✅ WebP створено:", file.basename);
          cb(null, file);
        })
      )
    )
    .pipe(gulp.dest(`${paths.dist}/images`));

export const serve = (done) => {
  connect.server({
    root: paths.dist,
    livereload: true,
    port: 3000,
  });
  done();
};

export const watchFiles = () => {
  gulp.watch(paths.html, html);
  gulp.watch(paths.styles, styles);
  gulp.watch(paths.scripts, scripts);
  gulp.watch(paths.images, images);
};

export default gulp.series(
  clean,
  gulp.parallel(html, styles, scripts, images),
  serve,
  watchFiles
);
