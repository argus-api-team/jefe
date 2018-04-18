import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map( function () { // eslint-disable-line
  this.route('lang', { path: '/:lang' }, function () {
    this.route('login');
    this.route('quote');
    this.route('referential', function () {
      this.route('makes', { path: '/' });
      this.route('make', { path: 'make/:id' });
      this.route('model', { path: 'model/:id' });
      this.route('vehicle', { path: 'vehicle/:id' });
    });
    this.route('license-plate');
  });
});

export default Router;
