module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'airbnb-base'
  ],  
  env: {
    browser: true,
    es6: true
  },
  rules: {
    "func-names": 0,
    "no-use-before-define": [2, "nofunc"],
    "no-param-reassign": [2, { "props": false }],
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/no-extraneous-dependencies": 0,
    "no-underscore-dangle": 0,
    "prefer-rest-params": 0,
  },
  globals: {
    "moment": true,
    'App': true,
    'Layout': true,
    'QuickSidebar': true
  },
  overrides: [
    // node files
    {
      files: [
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
