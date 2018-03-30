import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map( function () { // eslint-disable-line
  this.route('lang', { path: '/:lang' }, function () {
    this.route('login');
    this.route('search');
    this.route('quote');
    this.route('make', { path: '/make/:id' });
    this.route('showroom', function () {
      this.route('make', { path: 'make/:id' }, function () {
        this.route('model', { path: 'model/:model_id' }, function () {
          this.route('submodel', { path: 'model/:submodel_id' }, function () {
            this.route('generation', { path: 'generation/:generation_id' }, function () {
              this.route('phase', { path: 'phase/:phase_id' }, function () {
                this.route('version', { path: 'version/:version_id' }, function () {
                  this.route('period', { path: 'period/:period_id' });
                });
              });
            });
          });
        });
      });
    });
    this.route('referential', function () {
      this.route('makes', { path: '/' });
      this.route('make', { path: 'make/:id' });
    });
  });
});

export default Router;
