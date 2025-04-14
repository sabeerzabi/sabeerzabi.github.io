const mix = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts([
  './asset/jquery-1.12.3.min.js',
  './asset/jquery.easing.min.js',
  './asset/jquery.waypoints.min.js',
  './asset/jquery.counterup.min.js',
  './asset/popper.min.js',
  './asset/bootstrap.min.js',
  './asset/isotope.pkgd.min.js',
  './asset/infinite-scroll.min.js',
  './asset/imagesloaded.pkgd.min.js',
  './asset/contact.min.js',
  './asset/validator.min.js',
  './asset/wow.min.js',
  './asset/morphext.min.js',
  './asset/parallax.min.js',
  './asset/jquery.magnific-popup.min.js',
  './asset/custom.min.js',
], 'asset/app.js')
.styles([
  './asset/loader.min.css',
  './asset/bootstrap.min.css',
  './asset/animate.min.css',
  './asset/magnific-popup.min.css',
  './asset/fontawesome/css/all-mix.min.css',
  './asset/fonts/rubik/font-mix.css',
  './asset/style.min.css',
], 'asset/app.css');