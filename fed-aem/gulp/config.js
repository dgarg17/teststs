var clientLibs = '../cdw-aem-desktop/content/src/main/content/jcr_root/etc/designs/cdw-global/clientlibs';
var root = "./";
var src = "./app";
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
    src: src + '/*.html',
    dest: src
  },
  sass: {
    src: src + "/styles/sass/**/*.{sass,scss}",
    dest: src + "/styles/",
    settings: {
        includePaths: require('node-bourbon').includePaths,
        includePaths: require('node-neat').includePaths,
        errLogToConsole: true,
        imagePath: 'images' // Used by the image-url helper
    }
  },
  production: {
    cssDest: clientLibs + "/css/",
    jsDest: clientLibs + "/js/"
  }
};
