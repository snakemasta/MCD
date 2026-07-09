/**
 * Audit Logger Utility
 */
const db = require('../config/database');
const logger = require('./logger');
const { v4: uuidv4 } = require('uuid');

class AuditLogger {
  async log(userId, action, entityType, entityId, changes) {
    try {
      const auditEntry = {
        id: uuidv4(),
        user_id: userId,
        action: action,
        entity_type: entityType,
        entity_id: entityId,
        changes: JSON.stringify(changes),
        created_at: new Date(),
      };

      await db('audit_log').insert(auditEntry);
    } catch (error) {
      logger.error('Error logging audit entry:', error);
    }
  }

  async getAuditLog(entityType, entityId) {
    try {
      const logs = await db('audit_log')
        .where('entity_type', entityType)
        .where('entity_id', entityId)
        .orderBy('created_at', 'desc');

      return logs;
    } catch (error) {
      logger.error('Error retrieving audit log:', error);
      throw error;
    }
  }
}

module.exports = new AuditLogger();
