import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pbi-workspace-collection-preview', 'Integration | Component | pbi workspace collection preview', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pbi-workspace-collection-preview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pbi-workspace-collection-preview}}
      template block text
    {{/pbi-workspace-collection-preview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
