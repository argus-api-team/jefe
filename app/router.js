import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),
  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },
  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      this.get('metrics').trackPage({ page, title });
    });
  },
});

Router.map(function () { // eslint-disable-line
  this.route('login');
  this.route('data-set', { path: '/:data_set' }, function () {
    this.route('referential', function () {
      this.route('makes', { path: '/' });
      this.route('make', { path: 'make/:id' });
      this.route('model', { path: 'model/:id' }, function () {
        this.route('generation', { path: 'generation/:generation_id' }, function () {
          this.route('phase', { path: 'phase/:phase_id' });
        });
      });
      this.route('vehicle', { path: 'vehicle/:id' });
    });
    this.route('license-plate', function () {
      this.route('matching', { path: '/:id' });
    });
    this.route('quote', function () {
      this.route('valorize', function () {
        this.route('vehicle-identification', { path: '/' });
        this.route('offer');
        this.route('criteria');
      });
      this.route('valorization', { path: 'valorization/:id' });
    });
  });
  this.route('not-found', { path: '/*' });
});

export default Router;
