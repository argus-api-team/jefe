/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ['assets/flags', 'assets/logos']
    },
    sassOptions: {
      includePaths: [
        'node_modules/bootstrap/scss'
      ]
  }
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

  app.import(app.bowerDirectory + '/lazysizes/lazysizes.js');
  app.import(app.bowerDirectory + '/jquery-listnav/jquery-listnav.js');
  app.import(app.bowerDirectory + '/jquery-listnav/css/listnav.css');

  //Import Custom scroll bar plugin for metronic
  app.import('node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css');
  app.import('node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js');

  //Import base needed component for metronic
  app.import('vendor/metronic/framework/components/general/header.js');
  app.import('vendor/metronic/framework/components/general/offcanvas.js');
  app.import('vendor/metronic/framework/components/general/menu.js');
  app.import('vendor/metronic/framework/components/general/toggle.js');
  app.import('vendor/metronic/framework/components/general/dropdown.js');
  app.import('vendor/metronic/framework/components/general/scroll-top.js');

  //Import base script for metronic
  app.import('vendor/metronic/framework/base/util.js');
  app.import('vendor/metronic/framework/base/app.js');

  // Import init script for metronic layout components
  app.import('vendor/metronic/layout.js');

  return app.toTree();
};
