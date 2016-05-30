import { moduleForModel, test } from 'ember-qunit';

moduleForModel('access-key', 'Unit | Serializer | access key', {
  // Specify the other units that are required for this test.
  needs: ['serializer:access-key']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
