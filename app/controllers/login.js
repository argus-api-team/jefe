import Ember from 'ember'

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  routeAfterAuthentication: 'application.index',

  actions: {
    authenticate() {
      let { applicationId, applicationSecret, username, password } = this.getProperties('applicationId', 'applicationSecret', 'username', 'password');

      this.get('session').authenticate('authenticator:oauth2', applicationId, applicationSecret, username, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  }
});