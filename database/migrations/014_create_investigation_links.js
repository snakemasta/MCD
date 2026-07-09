/**
 * Investigation linked records table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('investigation_links', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('primary_investigation_id').notNullable().references('id').inTable('investigations').onDelete('CASCADE');
    table.uuid('linked_investigation_id').notNullable().references('id').inTable('investigations').onDelete('CASCADE');
    table.string('relationship_type'); // related, merged, split, etc
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['primary_investigation_id', 'linked_investigation_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('investigation_links');
};
