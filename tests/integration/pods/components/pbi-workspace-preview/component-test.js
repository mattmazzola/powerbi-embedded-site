import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pbi-workspace-preview', 'Integration | Component | pbi workspace preview', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pbi-workspace-preview}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pbi-workspace-preview}}
      template block text
    {{/pbi-workspace-preview}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
