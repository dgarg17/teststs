var clientLibs = '../cdw-aem-desktop/content/src/main/content/jcr_root/etc/designs/cdw-global/clientlibs';
var root = "./";
var src = "./app";
var testSrc = './test';
var bowerDir = './bower_components';
var jsDeploy = src + '/js/dist/';

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
  css: {
      src: src + "/styles/dist/**/*.css",
      dest: clientLibs + "/css/"
  },
  js: {
      src: src + "/js/dist/**/*.js",
      dest: clientLibs + "/js/"
  },
  markup: {
    src: src + '/*.html',
    dest: src
  },
  sass: {
    src: src + "/styles/sass/**/*.{sass,scss}",
    dest: src + "/styles/dist/",
    settings: {
        includePaths: require('node-bourbon').includePaths,
        includePaths: require('node-neat').includePaths,
        errLogToConsole: true,
        imagePath: 'images' // Used by the image-url helper
    }
  },
  browserify: {

        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [
            {
                entries: src + '/js/src/teams/common/main.js',
                dest: jsDeploy,
                outputName: 'main.js',
                // list of modules to make require-able externally
                require: ["jquery", "jquery-ui/dialog", "handlebars/runtime", "lodash"],
                // list of externally available modules to exclude from the bundle
                external: []
            }/*,
            {
                entries: src + '/js/src/test.js',
                dest: jsDeploy,
                outputName: 'test.js',
                // list of externally available modules to exclude from the bundle
                external: ["jquery", "jquery-ui/dialog", "handlebars/runtime", "lodash"]
            } */
        ]
    }
};
