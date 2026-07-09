/**
 * Investigation Service Implementation
 */
const db = require('../config/database');
const esClient = require('../config/elasticsearch');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

class InvestigationService {
  /**
   * Create a new investigation
   */
  async createInvestigation(data, userId) {
    try {
      const id = uuidv4();
      const caseNumber = await this.generateCaseNumber();

      const investigation = {
        id,
        case_number: caseNumber,
        title: data.title,
        description: data.description,
        status: data.status || 'active',
        priority: data.priority || 'medium',
        case_type: data.case_type,
        location: data.location,
        assigned_to: data.assigned_to,
        supervisor_id: data.supervisor_id,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Save to database
      await db('investigations').insert(investigation);

      // Index in Elasticsearch
      await esClient.index({
        index: 'investigations',
        id: id,
        body: investigation,
      });

      // Add timeline entry
      await this.addTimelineEvent(id, 'investigation_created', `Investigation created by ${userId}`, userId);

      logger.info(`Investigation created: ${caseNumber}`);
      return investigation;
    } catch (error) {
      logger.error('Error creating investigation:', error);
      throw error;
    }
  }

  /**
   * Get investigation by ID
   */
  async getInvestigation(id) {
    try {
      const investigation = await db('investigations').where('id', id).first();

      if (!investigation) {
        throw { statusCode: 404, message: 'Investigation not found' };
      }

      // Get related data
      const evidence = await db('evidence').where('investigation_id', id);
      const timeline = await db('investigation_timeline').where('investigation_id', id).orderBy('event_date', 'desc');
      const linkedInvestigations = await db('investigation_links')
        .where('primary_investigation_id', id)
        .join('investigations', 'investigation_links.linked_investigation_id', 'investigations.id')
        .select('investigations.*');

      return {
        ...investigation,
        evidence_count: evidence.length,
        timeline,
        linked_investigations: linkedInvestigations,
      };
    } catch (error) {
      logger.error('Error getting investigation:', error);
      throw error;
    }
  }

  /**
   * List investigations with filters
   */
  async listInvestigations(filters = {}, userId = null) {
    try {
      let query = db('investigations');

      if (filters.status) {
        query = query.where('status', filters.status);
      }

      if (filters.priority) {
        query = query.where('priority', filters.priority);
      }

      if (filters.assigned_to) {
        query = query.where('assigned_to', filters.assigned_to);
      }

      if (filters.supervisor_id) {
        query = query.where('supervisor_id', filters.supervisor_id);
      }

      const page = parseInt(filters.page) || 1;
      const limit = parseInt(filters.limit) || 20;
      const offset = (page - 1) * limit;

      const total = await query.clone().count('id as count').first();
      const investigations = await query.orderBy('created_at', 'desc').limit(limit).offset(offset);

      return {
        data: investigations,
        pagination: {
          page,
          limit,
          total: total.count,
        },
      };
    } catch (error) {
      logger.error('Error listing investigations:', error);
      throw error;
    }
  }

  /**
   * Update investigation
   */
  async updateInvestigation(id, data, userId) {
    try {
      const investigation = await db('investigations').where('id', id).first();

      if (!investigation) {
        throw { statusCode: 404, message: 'Investigation not found' };
      }

      const updatedData = {
        ...data,
        updated_at: new Date(),
      };

      await db('investigations').where('id', id).update(updatedData);

      // Update Elasticsearch
      await esClient.update({
        index: 'investigations',
        id: id,
        body: { doc: updatedData },
      });

      logger.info(`Investigation updated: ${id}`);
      return { ...investigation, ...updatedData };
    } catch (error) {
      logger.error('Error updating investigation:', error);
      throw error;
    }
  }

  /**
   * Add timeline event
   */
  async addTimelineEvent(investigationId, eventType, description, userId) {
    try {
      const timelineEvent = {
        id: uuidv4(),
        investigation_id: investigationId,
        event_type: eventType,
        description,
        event_date: new Date(),
        created_by: userId,
        created_at: new Date(),
      };

      await db('investigation_timeline').insert(timelineEvent);
      logger.info(`Timeline event added to investigation ${investigationId}`);
      return timelineEvent;
    } catch (error) {
      logger.error('Error adding timeline event:', error);
      throw error;
    }
  }

  /**
   * Link investigations
   */
  async linkInvestigations(primaryId, linkedId, relationshipType) {
    try {
      const link = {
        id: uuidv4(),
        primary_investigation_id: primaryId,
        linked_investigation_id: linkedId,
        relationship_type: relationshipType,
        created_at: new Date(),
      };

      await db('investigation_links').insert(link);
      logger.info(`Investigation linked: ${primaryId} <-> ${linkedId}`);
      return link;
    } catch (error) {
      logger.error('Error linking investigations:', error);
      throw error;
    }
  }

  /**
   * Generate unique case number
   */
  async generateCaseNumber() {
    const year = new Date().getFullYear();
    const count = await db('investigations').count('id as count').first();
    const nextNumber = (count.count + 1).toString().padStart(4, '0');
    return `MCD-${year}-${nextNumber}`;
  }
}

module.exports = new InvestigationService();
