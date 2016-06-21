import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pbi-resource-group-preview', 'Integration | Component | pbi resource group preview', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pbi-resource-group-preview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pbi-resource-group-preview}}
      template block text
    {{/pbi-resource-group-preview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
