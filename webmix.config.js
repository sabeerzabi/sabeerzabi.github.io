const webmix = require('webmix');

webmix.js([
  './asset/custom.min.js',
], 'asset/app.js')
.sass([
  './asset/style.min.css'
], 'asset/app.css');