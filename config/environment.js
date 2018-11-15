/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'jefe',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    googleFonts: [
      'Roboto:300,400,700',
      'Share+Tech+Mono'
    ],

    contentSecurityPolicy: {
      'font-src': "'self' fonts.gstatic.com",
      'style-src': "'self' fonts.googleapis.com"
    },

    i18n: {
      defaultLocale: 'en',
      allowedLocales: ['en', 'fr']
    },

    moment: {
      // Full list of locales: https://github.com/moment/moment/tree/2.10.3/locale
      includeLocales: ['en', 'fr']
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: 'UA-125946722-2',
          // Use `analytics_debug.js` in development
          // debug: environment === 'development',
          debug: false,
          // Use verbose tracing of GA events
          // trace: environment === 'development',
          trace: false,
          // Ensure development env hits aren't sent to GA
          sendHitTask: environment !== 'development'
          // Specify Google Analytics plugins
          // require: ['ecommerce']
        }
      },
    ],
  };

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'lang',
    routeIfAlreadyAuthenticated: 'lang'
  };
  if (environment !== 'production') {
    require('dotenv').config();
  }
  //Setup VarEnv
  ENV.API_URL = process.env.API_URL;
  ENV.OAUTH_URL = process.env.OAUTH_URL;
  ENV.ABLY_KEY = process.env.ABLY_KEY;
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.isSecureCookie = false;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.APP.isSecureCookie = false;
  }

  if (environment === 'production') {
    ENV.APP.isSecureCookie = true
  }



  return ENV;
};
