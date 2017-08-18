import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('lang', { path: '/:lang' }, function () {
    this.route('login');
    this.route('search');
    this.route('quote');
  });
});

export default Router;
