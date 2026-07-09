/**
 * Person Service Implementation
 */
const db = require('../config/database');
const esClient = require('../config/elasticsearch');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

class PersonService {
  /**
   * Create person
   */
  async createPerson(data, userId) {
    try {
      const id = uuidv4();

      const person = {
        id,
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        race: data.race,
        distinguishing_marks: data.distinguishing_marks,
        primary_address: data.primary_address,
        officer_notes: data.officer_notes,
        created_at: new Date(),
        updated_at: new Date(),
      };

      await db('persons').insert(person);

      // Index in Elasticsearch
      await esClient.index({
        index: 'persons',
        id: id,
        body: person,
      });

      // Add aliases
      if (data.aliases && data.aliases.length > 0) {
        for (const alias of data.aliases) {
          await db('person_aliases').insert({
            id: uuidv4(),
            person_id: id,
            alias: alias.alias,
            type: alias.type,
            created_at: new Date(),
          });
        }
      }

      // Add addresses
      if (data.addresses && data.addresses.length > 0) {
        for (const address of data.addresses) {
          await db('person_addresses').insert({
            id: uuidv4(),
            person_id: id,
            address: address.address,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
            type: address.type,
            created_at: new Date(),
          });
        }
      }

      // Add contacts
      if (data.contacts && data.contacts.length > 0) {
        for (const contact of data.contacts) {
          await db('person_contacts').insert({
            id: uuidv4(),
            person_id: id,
            contact_type: contact.contact_type,
            contact_value: contact.contact_value,
            platform: contact.platform,
            created_at: new Date(),
          });
        }
      }

      logger.info(`Person created: ${id}`);
      return person;
    } catch (error) {
      logger.error('Error creating person:', error);
      throw error;
    }
  }

  /**
   * Get person by ID
   */
  async getPerson(id) {
    try {
      const person = await db('persons').where('id', id).first();

      if (!person) {
        throw { statusCode: 404, message: 'Person not found' };
      }

      // Get aliases
      const aliases = await db('person_aliases').where('person_id', id);

      // Get addresses
      const addresses = await db('person_addresses').where('person_id', id);

      // Get contacts
      const contacts = await db('person_contacts').where('person_id', id);

      return {
        ...person,
        aliases,
        addresses,
        contacts,
      };
    } catch (error) {
      logger.error('Error getting person:', error);
      throw error;
    }
  }

  /**
   * Search persons
   */
  async searchPersons(query, filters = {}) {
    try {
      // Use Elasticsearch for full-text search
      const searchBody = {
        query: {
          multi_match: {
            query: query,
            fields: ['first_name', 'last_name', 'aliases.alias'],
          },
        },
        from: (parseInt(filters.page) || 1 - 1) * (parseInt(filters.limit) || 20),
        size: parseInt(filters.limit) || 20,
      };

      const results = await esClient.search({
        index: 'persons',
        body: searchBody,
      });

      return {
        data: results.hits.hits.map(hit => hit._source),
        total: results.hits.total.value,
      };
    } catch (error) {
      logger.error('Error searching persons:', error);
      throw error;
    }
  }

  /**
   * Get related investigations
   */
  async getRelatedInvestigations(personId) {
    try {
      // Find investigations where person is involved
      const investigations = await db('investigation_timeline')
        .join('investigations', 'investigation_timeline.investigation_id', 'investigations.id')
        .where('investigation_timeline.description', 'like', `%${personId}%`)
        .select('investigations.*')
        .distinct();

      return investigations;
    } catch (error) {
      logger.error('Error getting related investigations:', error);
      throw error;
    }
  }
}

module.exports = new PersonService();
