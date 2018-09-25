'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-bare-strings': true
  },
  ignore: ['./addon/templates/components/star-rating'] // Ignore option have an issue: https://github.com/ember-template-lint/ember-cli-template-lint/issues/281
};
