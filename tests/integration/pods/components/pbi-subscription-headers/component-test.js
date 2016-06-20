import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pbi-subscription-headers', 'Integration | Component | pbi subscription headers', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pbi-subscription-headers}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pbi-subscription-headers}}
      template block text
    {{/pbi-subscription-headers}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
