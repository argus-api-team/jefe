import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Cookies from 'ember-cli-js-cookie';

export default Component.extend({
  session: service('session'),
  config: service(),

  tagName: 'form',
  classNames: ['login-form', 'm-portlet'],

  applicationId: Cookies.get('applicationId'),
  applicationSecret: Cookies.get('applicationSecret'),
  username: Cookies.get('username'),
  password: Cookies.get('password'),
  isRemembered: Cookies.get('isRemembered'),
  expiresLength: 15,
  isSecureCookie: computed.alias('config.APP.isSecureCookie'),
  isLogingIn: false,

  init() {
    this._super(...arguments);
    this.credentialProperties = [
      'applicationId', 'applicationSecret',
      'username', 'password', 'isRemembered',
    ];
  },

  actions: {
    authenticate() {
      this.set('errorMessage', false);

      this._rememberCredentials();

      const {
        applicationId,
        applicationSecret,
        username,
        password,
      } = this.getProperties('applicationId', 'applicationSecret', 'username', 'password');
      this.set('isLogingIn', true);
      this.get('session').authenticate('authenticator:oauth2', applicationId, applicationSecret, username, password)
        .then(() => {
          this.get('controller').transitionToRoute('lang', { lang: this.get('controller.lang') });
        })
        .catch((reason) => {
          this.set('errorMessage', reason.error);
        })
        .finally(() => {
          this.set('isLogingIn', false);
        });
    },
  },

  _saveCredentials() {
    this.get('credentialProperties').forEach((property) => {
      Cookies.set(property, this.get(property), { expires: this.get('expiresLength'), secure: this.get('isSecureCookie') });
    });
  },

  _clearCredentials() {
    this.get('credentialProperties').forEach((property) => {
      Cookies.remove(property, { secure: this.get('isSecureCookie') });
    });
  },

  _rememberCredentials() {
    if (this.get('isRemembered')) {
      this._saveCredentials();
    } else {
      this._clearCredentials();
    }
  },
});
