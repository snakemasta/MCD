/**
 * Interviews table migration
 */
exports.up = function(knex) {
  return knex.schema.createTable('interviews', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('investigation_id').notNullable().references('id').inTable('investigations').onDelete('CASCADE');
    table.uuid('subject_id').notNullable().references('id').inTable('persons');
    table.enum('type', ['witness', 'suspect', 'victim', 'confidential_informant']).notNullable();
    table.timestamp('interview_date').notNullable();
    table.string('location');
    table.json('officers_present');
    table.text('summary');
    table.string('recording_url');
    table.text('transcript');
    table.json('follow_up_questions');
    table.text('credibility_notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.index(['investigation_id']);
    table.index(['subject_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('interviews');
};
