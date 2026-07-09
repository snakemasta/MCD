/**
 * External links for evidence migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('external_links', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('evidence_id').notNullable().references('id').inTable('evidence').onDelete('CASCADE');
    table.string('link_type'); // google_drive, bodycam, dashcam, photo, video, etc
    table.string('url').notNullable();
    table.string('title');
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.index(['evidence_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('external_links');
};
