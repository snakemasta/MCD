/**
 * Person contacts table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('person_contacts', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('person_id').notNullable().references('id').inTable('persons').onDelete('CASCADE');
    table.string('contact_type'); // phone, email, social_media
    table.string('contact_value').notNullable();
    table.string('platform'); // for social media
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.index(['person_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('person_contacts');
};
