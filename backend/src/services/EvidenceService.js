/**
 * Evidence Service Implementation
 */
const db = require('../config/database');
const esClient = require('../config/elasticsearch');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

class EvidenceService {
  /**
   * Add evidence to investigation
   */
  async addEvidence(investigationId, data, userId) {
    try {
      const id = uuidv4();

      const evidence = {
        id,
        investigation_id: investigationId,
        title: data.title,
        description: data.description,
        category: data.category,
        status: data.status || 'logged',
        collected_date: data.collected_date || new Date(),
        collected_by: userId,
        created_at: new Date(),
        updated_at: new Date(),
      };

      await db('evidence').insert(evidence);

      // Index in Elasticsearch
      await esClient.index({
        index: 'evidence',
        id: id,
        body: evidence,
      });

      // Add chain of custody entry
      if (data.chain_of_custody) {
        await this.updateChainOfCustody(id, data.chain_of_custody, userId);
      }

      // Add external links
      if (data.external_links && data.external_links.length > 0) {
        for (const link of data.external_links) {
          await db('external_links').insert({
            id: uuidv4(),
            evidence_id: id,
            link_type: link.type,
            url: link.url,
            title: link.title,
            description: link.description,
            created_at: new Date(),
          });
        }
      }

      logger.info(`Evidence added: ${id}`);
      return evidence;
    } catch (error) {
      logger.error('Error adding evidence:', error);
      throw error;
    }
  }

  /**
   * Get evidence by ID
   */
  async getEvidence(id) {
    try {
      const evidence = await db('evidence').where('id', id).first();

      if (!evidence) {
        throw { statusCode: 404, message: 'Evidence not found' };
      }

      // Get chain of custody
      const chainOfCustody = await db('chain_of_custody').where('evidence_id', id).orderBy('received_date');

      // Get external links
      const externalLinks = await db('external_links').where('evidence_id', id);

      return {
        ...evidence,
        chain_of_custody: chainOfCustody,
        external_links: externalLinks,
      };
    } catch (error) {
      logger.error('Error getting evidence:', error);
      throw error;
    }
  }

  /**
   * List evidence by investigation
   */
  async listEvidenceByInvestigation(investigationId, filters = {}) {
    try {
      let query = db('evidence').where('investigation_id', investigationId);

      if (filters.category) {
        query = query.where('category', filters.category);
      }

      if (filters.status) {
        query = query.where('status', filters.status);
      }

      const page = parseInt(filters.page) || 1;
      const limit = parseInt(filters.limit) || 20;
      const offset = (page - 1) * limit;

      const total = await query.clone().count('id as count').first();
      const evidence = await query.orderBy('created_at', 'desc').limit(limit).offset(offset);

      return {
        data: evidence,
        pagination: {
          page,
          limit,
          total: total.count,
        },
      };
    } catch (error) {
      logger.error('Error listing evidence:', error);
      throw error;
    }
  }

  /**
   * Update chain of custody
   */
  async updateChainOfCustody(evidenceId, custodyData, userId) {
    try {
      const custodyEntry = {
        id: uuidv4(),
        evidence_id: evidenceId,
        received_by: custodyData.received_by || userId,
        received_from: custodyData.received_from,
        received_date: custodyData.received_date || new Date(),
        released_to: custodyData.released_to,
        released_date: custodyData.released_date,
        notes: custodyData.notes,
        created_at: new Date(),
      };

      await db('chain_of_custody').insert(custodyEntry);
      logger.info(`Chain of custody updated for evidence: ${evidenceId}`);
      return custodyEntry;
    } catch (error) {
      logger.error('Error updating chain of custody:', error);
      throw error;
    }
  }
}

module.exports = new EvidenceService();
