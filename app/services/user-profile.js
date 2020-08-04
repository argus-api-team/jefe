import Service from '@ember/service';  // eslint-disable-line
import { inject as service } from '@ember/service'; // eslint-disable-line
import { computed } from '@ember/object';

export default Service.extend({
  session: service(),
  userSettings: service(),

  userPreference: null,

  init() {
    this._super(...arguments);
  },

  userToken: computed('session.isAuthenticated', function () {
    const session = this.get('session');
    if (session.get('isAuthenticated')) {
      return session.get('data').authenticated.access_token;
    }
    return null;
  }),

  userScope: computed('userToken', function () {
    const token = this.get('userToken');
    if (token) {
      return JSON.parse(window.atob(token.split('.')[1])).ctx.scp;
    }
    return [];
  }),

  userId: computed('userToken', function () {
    const token = this.get('userToken');
    if (token) {
      const userId = JSON.parse(window.atob(token.split('.')[1])).ctx.user.id;
      return userId;
    }
    return null;
  }),

  crossCountryScope: computed('userScope', function () {
    return this.get('userScope').includes('Specs::V2::CrossCountryAccess');
  }),
  valorizationScope: computed('userScope', function () {
    return this.get('userScope').includes('Checkout::V3::ValorizationResource');
  }),
  matchingScope: computed('userScope', function () {
    return this.get('userScope').includes('Checkout::V3::MatchingResource');
  }),

});
