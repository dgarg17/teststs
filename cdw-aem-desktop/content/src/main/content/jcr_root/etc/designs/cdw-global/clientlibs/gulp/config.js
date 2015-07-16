var dest = "./";
var src = './';
var testSrc = './test';
var bowerDir = './bower_components';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: src,
        routes: {
            "/api": "/api"
        }
    }
  },
  markup: {
    src: src,
    dest: src
  },
  sass: {
    src: src + "css/sass/**/*.{sass,scss}",
    dest: src + "css/",
    settings: {
        includePaths: require('node-bourbon').includePaths,
        includePaths: require('node-neat').includePaths,
        errLogToConsole: true,
        imagePath: 'images' // Used by the image-url helper
    }
  },
    production: {
        cssSrc: src + 'css/**/*.css',
        cssDest: src + 'css/'
    },
};
