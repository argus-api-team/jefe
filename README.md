[![Build Status](https://travis-ci.org/argus-api-team/jefe.svg?branch=master)](https://travis-ci.org/argus-api-team/jefe)

# jefe

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Docker](https://docs.docker.com/install/overview/)
* [Automake](https://www.gnu.org/software/automake/)

## Installation

* `git clone <repository-url>` this repository
* `cd jefe`
* `make install_all`

## Enter in container to use Ember-CLI

To run and enter in the development container use: `make start_cotainer`.

If your development container is already running in other terminal use: `make container_shell`.

## Running / Development
* `ember s`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).


### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)


## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)


## Troubleshooting

### Inotify: Add watch

If you're using Linux you may encounter some issues with inotify.
In the most of case, inotify reach the watch limit. You can increase it by running the following target:

* `make inotify_add_limit`
