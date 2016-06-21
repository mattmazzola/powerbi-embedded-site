import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pbi-report-actions', 'Integration | Component | pbi report actions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pbi-report-actions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pbi-report-actions}}
      template block text
    {{/pbi-report-actions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
