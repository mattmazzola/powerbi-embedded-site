import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pbi-workspace-collection-details', 'Integration | Component | pbi workspace collection details', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pbi-workspace-collection-details}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pbi-workspace-collection-details}}
      template block text
    {{/pbi-workspace-collection-details}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
