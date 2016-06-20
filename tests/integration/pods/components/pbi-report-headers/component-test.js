import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pbi-report-headers', 'Integration | Component | pbi report headers', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pbi-report-headers}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pbi-report-headers}}
      template block text
    {{/pbi-report-headers}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
