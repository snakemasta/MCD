/**
 * Seed initial data for investigations
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('investigations').del();

  // Inserts seed entries
  await knex('investigations').insert([
    {
      case_number: 'MCD-2024-001',
      title: 'Homicide Investigation - Downtown',
      description: 'Initial investigation into homicide on Main Street',
      status: 'active',
      priority: 'critical',
      case_type: 'homicide',
      location: 'Downtown District',
    },
    {
      case_number: 'MCD-2024-002',
      title: 'Robbery Investigation - Commercial District',
      description: 'Armed robbery of convenience store',
      status: 'active',
      priority: 'high',
      case_type: 'robbery',
      location: 'Commercial District',
    },
    {
      case_number: 'MCD-2023-045',
      title: 'Cold Case - Missing Person',
      description: 'Follow-up investigation on missing person case from 2023',
      status: 'cold',
      priority: 'medium',
      case_type: 'missing_person',
      location: 'Unknown',
    },
  ]);
};
