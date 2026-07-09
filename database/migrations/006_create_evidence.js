/**
 * Evidence table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('evidence', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('investigation_id').notNullable().references('id').inTable('investigations').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description');
    table.enum('category', ['physical', 'digital', 'document', 'media', 'biological', 'forensic']);
    table.enum('status', ['logged', 'analyzed', 'returned', 'destroyed']).defaultTo('logged');
    table.timestamp('collected_date');
    table.string('collected_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.index(['investigation_id']);
    table.index(['category', 'status']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('evidence');
};
