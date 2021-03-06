import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pbi-workspace-collection-actions', 'Integration | Component | pbi workspace collection actions', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pbi-workspace-collection-actions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pbi-workspace-collection-actions}}
      template block text
    {{/pbi-workspace-collection-actions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
