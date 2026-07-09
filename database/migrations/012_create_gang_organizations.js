/**
 * Gang organizations table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('gang_organizations', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable().unique();
    table.text('description');
    table.string('territory');
    table.json('colors');
    table.json('known_associates');
    table.json('rivals');
    table.text('criminal_activity');
    table.text('intelligence_notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('gang_organizations');
};
