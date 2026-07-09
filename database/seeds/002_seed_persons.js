/**
 * Seed initial data for persons
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('persons').del();

  // Inserts seed entries
  await knex('persons').insert([
    {
      first_name: 'John',
      last_name: 'Doe',
      date_of_birth: '1985-05-15',
      gender: 'M',
      race: 'Caucasian',
      distinguishing_marks: 'Tattoo on right arm - skulls',
      primary_address: '123 Main St, Downtown',
      officer_notes: 'Known gang affiliate, multiple priors',
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      date_of_birth: '1992-03-20',
      gender: 'F',
      race: 'African American',
      distinguishing_marks: 'Scar on left cheek',
      primary_address: '456 Oak Ave, Westside',
      officer_notes: 'Cooperative witness in multiple cases',
    },
  ]);
};
