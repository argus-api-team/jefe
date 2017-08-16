/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // METRONIC GLOBAL MANDATORY STYLES
  app.import('vendor/metronic/global/plugins/font-awesome/css/font-awesome.min.css');
  app.import('vendor/metronic/global/plugins/simple-line-icons/simple-line-icons.min.css');
  app.import('vendor/metronic/global/plugins/bootstrap/css/bootstrap.min.css');
  app.import('vendor/metronic/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css');

  // METRONIC PAGE LEVEL PLUGINS
  app.import('vendor/metronic/global/plugins/select2/css/select2.min.css');
  app.import('vendor/metronic/global/plugins/select2/css/select2-bootstrap.min.css');

  // METRONIC THEME GLOBAL STYLES
  app.import('vendor/metronic/global/css/components-md.min.css');
  app.import('vendor/metronic/global/css/plugins-md.min.css');

  // METRONIC PAGE LEVEL STYLES
  app.import('vendor/metronic/pages/css/login.min.css');

  // METRONIC CORE PLUGINS
  app.import('vendor/metronic/global/plugins/bootstrap/js/bootstrap.min.js');
  app.import('vendor/metronic/global/plugins/js.cookie.min.js');
  app.import('vendor/metronic/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js');
  app.import('vendor/metronic/global/plugins/jquery.blockui.min.js');
  app.import('vendor/metronic/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js');

  // METRONIC PAGE LEVEL PLUGINS
  app.import('vendor/metronic/global/plugins/jquery-validation/js/jquery.validate.min.js');
  app.import('vendor/metronic/global/plugins/jquery-validation/js/additional-methods.min.js');
  app.import('vendor/metronic/global/plugins/select2/js/select2.full.min.js');

  return app.toTree();
};
