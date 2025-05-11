const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activitylogcontroller');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/rolehandler');

// Retrieve all activity logs
router.get('/', authMiddleware, roleMiddleware(['Admin']), activityLogController.getAllActivityLogs);

module.exports = router;