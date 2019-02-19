import Service from '@ember/service';  // eslint-disable-line
import { inject as service } from '@ember/service'; // eslint-disable-line
import $ from 'jquery';

export default Service.extend({
  userProfile: service(),
  intl: service(),

  init() {
    this._super(...arguments);
    this._loadUserSettings();
  },

  userSettings: null,


  /**
   * Handle local persistence layer of user settings
   */

  _loadUserSettings() {
    const userProfile = this.get('userProfile');
    const userId = userProfile.get('userId');
    const savedUserSettings = JSON.parse(localStorage.getItem(`${userId}-settings`));
    if (!savedUserSettings) {
      this._createUserSettings();
      return;
    }
    this.set('userSettings', savedUserSettings);
    this._setUserLocal();
  },

  _saveUserSettings() {
    const userProfile = this.get('userProfile');
    const userId = userProfile.get('userId');
    const userSettings = this.get('userSettings');
    localStorage.setItem(`${userId}-settings`, JSON.stringify(userSettings));
  },

  _createUserSettings() {
    const intl = this.get('intl');
    const userProfile = this.get('userProfile');
    const userId = userProfile.get('userId');
    const userSettings = {
      locale: intl.get('locale'),
    };
    localStorage.setItem(`${userId}-settings`, JSON.stringify(userSettings));
    this.set('userSettings', userSettings);
  },


  /**
   * Handle User locale setting
   */

  _setUserLocal() {
    const { locale } = this.userSettings;
    this.intl.setLocale(locale);
    $('html').attr('locale', locale);
  },

  updateUserLocale(locale) {
    const intl = this.get('intl');
    const userSettings = this.get('userSettings');
    intl.setLocale(locale);
    $('html').attr('locale', locale);
    userSettings.locale = intl.get('locale');
    this.set('userSettings', userSettings);
    this._saveUserSettings();
  },
});
