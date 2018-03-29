import EmberRoute from '@ember/routing/route';
import RSVP from 'rsvp';

export default EmberRoute.extend({
  model() {
    return RSVP.hash({
      topMakes: this.get('store').query('make', {
        sort: 'position-quote',
        page: { size: 10 },
      }),
      topVehicles: this.get('store').query('version', {
        sort: '-quote-ratio',
        include: 'make,submodel',
        page: { size: 10 },
        // filter: {
        //   quotable: true,
        // },
        meta: {
          filterable: false,
        },
      }),
      latestVehicles: this.get('store').query('version', {
        sort: '-id',
        include: 'make,submodel',
        page: { size: 10 },
        meta: {
          filterable: false,
        },
      }),
    });
  },
});
