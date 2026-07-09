/**
 * Investigation Controller
 */
const investigationService = require('../services/InvestigationService');
const auditLogger = require('../utils/auditLogger');

class InvestigationController {
  /**
   * POST /api/investigations
   */
  async createInvestigation(req, res, next) {
    try {
      const investigation = await investigationService.createInvestigation(
        req.body,
        req.user.id
      );

      await auditLogger.log(req.user.id, 'create', 'investigation', investigation.id, {});

      res.status(201).json({
        success: true,
        data: investigation,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/investigations
   */
  async listInvestigations(req, res, next) {
    try {
      const result = await investigationService.listInvestigations(
        req.query,
        req.user.id
      );

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/investigations/:id
   */
  async getInvestigation(req, res, next) {
    try {
      const investigation = await investigationService.getInvestigation(
        req.params.id
      );

      res.json({
        success: true,
        data: investigation,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/investigations/:id
   */
  async updateInvestigation(req, res, next) {
    try {
      const investigation = await investigationService.updateInvestigation(
        req.params.id,
        req.body,
        req.user.id
      );

      await auditLogger.log(
        req.user.id,
        'update',
        'investigation',
        investigation.id,
        req.body
      );

      res.json({
        success: true,
        data: investigation,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InvestigationController();
