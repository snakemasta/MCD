const { Client } = require('@elastic/elasticsearch');
const logger = require('../utils/logger');

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
});

// Initialize indices
(async () => {
  try {
    // Check if indices exist, create if they don't
    const indices = [
      'investigations',
      'persons',
      'evidence',
      'warrants',
      'bolos',
      'interviews',
    ];

    for (const index of indices) {
      const exists = await client.indices.exists({ index });
      if (!exists) {
        await client.indices.create({ index });
        logger.info(`Created Elasticsearch index: ${index}`);
      }
    }
  } catch (error) {
    logger.error('Elasticsearch initialization error:', error);
  }
})();

module.exports = client;
