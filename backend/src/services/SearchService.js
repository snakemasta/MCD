/**
 * Search Service Implementation
 */
const esClient = require('../config/elasticsearch');
const logger = require('../utils/logger');

class SearchService {
  /**
   * Global search across all indices
   */
  async globalSearch(query, filters = {}) {
    try {
      const searchBody = {
        query: {
          multi_match: {
            query: query,
            fields: [
              'title',
              'description',
              'case_number',
              'first_name',
              'last_name',
              'name',
            ],
          },
        },
      };

      const indices = ['investigations', 'persons', 'evidence', 'warrants', 'bolos'];
      const results = {};

      for (const index of indices) {
        try {
          const indexResults = await esClient.search({
            index: index,
            body: searchBody,
          });

          results[index] = indexResults.hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source,
          }));
        } catch (error) {
          logger.warn(`Error searching index ${index}:`, error.message);
        }
      }

      return results;
    } catch (error) {
      logger.error('Error performing global search:', error);
      throw error;
    }
  }

  /**
   * Search specific index
   */
  async searchIndex(index, query, filters = {}) {
    try {
      const searchBody = {
        query: {
          multi_match: {
            query: query,
            fields: ['*'],
          },
        },
        from: (parseInt(filters.page) || 1 - 1) * (parseInt(filters.limit) || 20),
        size: parseInt(filters.limit) || 20,
      };

      const results = await esClient.search({
        index: index,
        body: searchBody,
      });

      return {
        data: results.hits.hits.map(hit => ({
          id: hit._id,
          ...hit._source,
        })),
        total: results.hits.total.value,
      };
    } catch (error) {
      logger.error(`Error searching index ${index}:`, error);
      throw error;
    }
  }

  /**
   * Index document
   */
  async indexDocument(index, doc) {
    try {
      const result = await esClient.index({
        index: index,
        id: doc.id,
        body: doc,
      });

      return result;
    } catch (error) {
      logger.error(`Error indexing document in ${index}:`, error);
      throw error;
    }
  }
}

module.exports = new SearchService();
