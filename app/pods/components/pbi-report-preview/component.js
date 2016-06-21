import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  showEmbed: false,
  report: computed.alias('node.value'),

  embedConfig: computed('report', function () {
    return {
      type: 'report',
      embedUrl: this.get('report.embedUrl'),
      accessToken: this.get('report.accessToken')
    };
  }),


  actions: {
    embed() {
      console.log('embed');
      this.set('showEmbed', true);
    }
  }
});
